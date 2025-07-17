import { Link } from "react-router";

const Breadcrumb = ({ category, subcategory, name }) => {
  return (
    <nav className="mb-4 text-sm text-gray-500">
      <ol className="flex flex-wrap list-reset">
        <li>
          <Link to="/" className="hover:text-red-400">
            Home
          </Link>
        </li>
        <li className="mx-2">/</li>
        <li>
          <Link
            to={`/category/${category}`}
            className="capitalize hover:text-red-400"
          >
            {category}
          </Link>
        </li>
        <li className="mx-2">/</li>
        <li>
          <Link
            to={`/category/${category}/${subcategory}`}
            className="capitalize hover:text-red-400"
          >
            {subcategory}
          </Link>
        </li>
        <li className="mx-2">/</li>
        <li className="font-medium text-gray-800 dark:text-gray-300">{name}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
