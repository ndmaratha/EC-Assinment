import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
}

const ProductsPage: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const productsPerPage = 8;

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			setError(null);
			const token = localStorage.getItem("authToken");
			try {
				const response = await fetch(
					"https://intern-task-api.bravo68web.workers.dev/api/products",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(
						errorText || `HTTP error! Status: ${response.status}`
					);
				}

				const result: Product[] = await response.json();
				setProducts(result);
				setTotalPages(Math.ceil(result.length / productsPerPage));
			} catch (err: any) {
				setError(err.message || "An error occurred while fetching products.");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1);
	};

	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const displayedProducts = filteredProducts.slice(
		(currentPage - 1) * productsPerPage,
		currentPage * productsPerPage
	);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Products</h1>

			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}

			<div className="mb-4">
				<input
					type="text"
					placeholder="Search products..."
					value={searchQuery}
					onChange={handleSearchChange}
					className="px-4 py-2 border border-black rounded-md w-full"
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{displayedProducts.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						title={product.title}
						price={product.price}
						thumbnail={product.thumbnail}
					/>
				))}
			</div>

			<div className="mt-4 flex justify-between items-center">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
				>
					Previous
				</button>
				<span className="text-lg">
					Page {currentPage} of {totalPages}
				</span>
				{currentPage < totalPages && (
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
					>
						Next
					</button>
				)}
			</div>
		</div>
	);
};

export default ProductsPage;
