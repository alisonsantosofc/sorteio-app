interface CustomIframeProps {
  src: string;
  width: string,
  height: string,
  className?: string;
}

export function CustomIframe({ width, height, src, className }: CustomIframeProps) {
	return (
		<iframe 
			className={className ? className : ''}
			width={width} 
			height={height}
			src={src}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowFullScreen
		>
		</iframe>
	);
}