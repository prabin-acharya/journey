import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { BiPencil } from "react-icons/bi";

const Page = ({ page }) => {
  return (
    <div className="page">
      <span className="page-heading">
        <h1>{page.title}</h1>
        <Link to={`/${page.title}/edit`}>
          <BiPencil className="page-edit-icon" />
        </Link>
      </span>
      <div className="page-topics">
        {page.topics &&
          page.topics.map((topic) => (
            <span className="page-topic">#{topic}</span>
          ))}
      </div>

      <span className="page-content">
        <ReactMarkdown children={page.content} />
      </span>
    </div>
  );
};

export default Page;
