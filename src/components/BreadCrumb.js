import { Link } from "react-router-dom";

const BreadCrumb = ({ breadCrumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/dashboard">Home</Link>
        </li>
        {breadCrumbs.map((breadcrumb, i) => {
          const active = breadcrumb?.active ? "active" : "";

          let textContent = (
            <Link to={breadcrumb?.link}>{breadcrumb?.name}</Link>
          );
          if (breadcrumb?.active) {
            textContent = breadcrumb?.name;
          }
          return (
            <li key={i} className={`breadcrumb-item ${active}`}>
              {textContent}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
