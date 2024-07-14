import React, { useState, useEffect, useRef } from "react";

function App() {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const bottomRef = useRef(null);

	async function fetchData() {
		try {
			setLoading(true);
			const response = await fetch(
				"https://dummyjson.com/products?limit=100"
			);
			const result = await response.json();
			if (result && result.products && result.products.length) {
				console.log(result.products);
				setData(result.products);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return <h1>Loading... Please wait</h1>;
	}

	function handleScrollTop() {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	function handleScrollBottom() {
		bottomRef.current.scrollIntoView({ behavior: "smooth" });
	}

	return (
		<div className="app-container">
			<h2>This is a top of the page</h2>
			<button onClick={handleScrollBottom}>Scroll to bottom</button>
			<ul>
				{data && data.length
					? data.map((productItem, index) => (
							<li key={index}>{productItem.title}</li>
					  ))
					: null}
			</ul>
			<button onClick={handleScrollTop}>Scroll to top</button>
			<div ref={bottomRef}></div>
			<h2>This is a bottom of the page</h2>
		</div>
	);
}

export default App;
