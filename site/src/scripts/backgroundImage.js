import Random from 'canvas-sketch-util/random';
import { pathsToSVGPaths } from 'canvas-sketch-util/penplot';
import { mapRange, linspace } from 'canvas-sketch-util/math';
import { isoBands } from 'marchingsquares';
import { getBgAsset } from "./cloudinary";

function generateBackgroundImage(seed) {

  const width = 4000;
  const height = 4000;
  const strokeWidth = 6;

  Random.setSeed(seed);
  const isoLines = drawIsolines([0, width], [0, height]);

  const paths = pathsToSVGPaths(isoLines, {
    width,
    height,
    units: 'px',
  });

  function drawIsolines([xMin, xMax], [yMin, yMax]) {
    const sizeX = xMax - xMin;
    const sizeY = yMax - yMin;
    const offset = [xMin, yMin];
    const intervals = linspace(12);
    const gridSize = 100;
    const lines = [];
    let data = [];

    // On a 100x100 grid get noise data
    for (let y = 0; y < gridSize; y++) {
      data[y] = [];
      for (let x = 0; x < gridSize; x++) {
        const scale = gridSize;
        const n = Random.noise2D(x / scale, y / scale);
        // noise data has a range of -1 to 1, we remap it to 0 to 1
        data[y].push(mapRange(n, -1, 1, 0, 1));
      }
    }

    // At Equally spaced intervals, generate isoBands
    intervals.forEach((_, idx) => {
      if (idx > 0) {
        const lowerBand = intervals[idx - 1];
        const upperBand = intervals[idx];

        isoBands(data, lowerBand, upperBand - lowerBand, {
          successCallback(bands) {
            bands.forEach((band) => {
              // The isoBand is generate in x: 0-100 and y: 0-100
              // Map that to the actual width and height of the image
              const scaledBand = band.map(([x, y]) => [
                offset[0] + mapRange(x, 0, 99, 0, sizeX),
                offset[1] + mapRange(y, 0, 99, 0, sizeY),
              ]);

              lines.push(scaledBand);
            });
          },
        });
      }
    });

    return lines;
  }

  return `
    <svg
      width="${width}px"
      height="${height}px"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="${strokeWidth} ${strokeWidth} ${width - 2 * strokeWidth} ${height - strokeWidth}"
    >
    
      <g
        strokeLinecap="round"
        strokeLinecap="round"
        strokeWidth="${strokeWidth}px"
        fill="none"
        stroke="#555555"
        strokeOpacity="0.1"
      >
        ${paths.map((d, idx) => (`<path key="${idx}" d="${d}" />`))}
      </g>
    </svg>`.replace(/[\n\r]/g, '');
}

async function BackgroundImage(public_id) {
  const svg = generateBackgroundImage(public_id);
  const asset = await getBgAsset(svg, public_id);
  const bgImage = asset?.secure_url.replace("upload/", `upload/w_auto,c_scale/`);
  return `background-image: url("${bgImage}")`;
}

export default BackgroundImage