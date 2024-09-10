// src/components/ProductCard.tsx
import React from "react";

interface ProductCardProps {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
	id,
	title,
	price,
	thumbnail,
}) => {
	return (
		<div key={id} className="border p-4 rounded-md shadow-md">
			<img
				src={thumbnail}
				alt={title}
				className="w-full h-48 object-cover mb-2"
			/>
			<h2 className="text-xl font-semibold">{title}</h2>
			<p className="text-gray-600">${price.toFixed(2)}</p>
		</div>
	);
};

export default ProductCard;
