import { Link } from "react-router";

const Breadcrumb = ({ category, subcategory, name }) => {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ol className="list-reset flex flex-wrap">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li className="mx-2">/</li>
        <li>
          <Link
            to={`/category/${category}`}
            className="hover:underline capitalize"
          >
            {category}
          </Link>
        </li>
        <li className="mx-2">/</li>
        <li>
          <Link
            to={`/category/${category}/${subcategory}`}
            className="hover:underline capitalize"
          >
            {subcategory}
          </Link>
        </li>
        <li className="mx-2">/</li>
        <li className="text-gray-800 font-medium">{name}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
