import React from 'react';
import useLoc from '../hooks/useLoc';

export interface BodyProps {}

export const Body: React.FC<BodyProps> = () => {
	const loc = useLoc();
	return (
		<div>
			<p
				dangerouslySetInnerHTML={{
					__html: loc.bodyEditAndSave('<code>src/App.tsx</code>'),
				}}
			></p>
			<a
				className='App-link'
				href='https://reactjs.org'
				target='_blank'
				rel='noopener noreferrer'
			>
				{loc.bodyLearnReact}
			</a>
			{/* <br /> */}
			<hr style={{ opacity: 0.25 }} />
			<a
				className='App-link'
				href='https://reactjs.org'
				target='_blank'
				rel='noopener noreferrer'
			>
				{loc.bodyKnowMore}
			</a>
		</div>
	);
};
