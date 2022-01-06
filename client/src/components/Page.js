import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { BiPencil } from "react-icons/bi";
import Topics from "./Topics";

const Page = ({ page }) => {
  return (
    <div className="page">
      <span className="page-heading">
        <h1>{page.title}</h1>
        <Link to={`/${page.title.replace(/\s+/g, "-")}-${page._id}/edit`}>
          <BiPencil className="page-edit-icon" />
        </Link>
      </span>
      <Topics topics={page.topics} />
      <span className="page-content">
        <ReactMarkdown children={page.content} />
      </span>
    </div>
  );
};

export default Page;
