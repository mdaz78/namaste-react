/**
 * <div id="parent">
 * 		<div id="child">
 * 			<h1>Hello World</h1>
 * 		</div>
 * 		<div id="child2">
 * 			<h1>I am another heading</h1>
 * 		</div>
 * </div>
 */

const parent = React.createElement('div', { id: 'parent' }, [
  React.createElement('div', { id: 'child' }, [
    React.createElement('h1', { id: 'heading' }, 'Hello I am H1'),
  ]),
  React.createElement('div', { id: 'child,' }, [
    React.createElement('h1', {}, 'I am another heading'),
  ]),
]);

console.log(parent);

const heading = React.createElement('h1', { id: 'heading' }, 'Hello World');

const rootDiv = document.querySelector('#root');

const root = ReactDOM.createRoot(rootDiv);

root.render(parent);
