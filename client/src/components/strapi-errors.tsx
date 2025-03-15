// interface StrapiErrorsProps {
// 	message: string;
// }

// export function StrapiErrors({ message }: StrapiErrorsProps) {
// 	return <div className="error-message">{message}</div>;
// }

interface StrapiErrorsProps {
	message: string | null;
	name: string;
	status: string | null;
}

export function StrapiErrors({ error }: { readonly error: StrapiErrorsProps }) {
	if (!error?.message) return null;
	return <div className="">{error.message}</div>;
}
