
function Image(props) {
	
	const { alt, src, style } = props;
	
	const cloudinarySrc = 'f_auto,w_auto';

	return (
		<img alt={alt} style={style} src={cloudinarySrc} />
	);
}

export default Image;
