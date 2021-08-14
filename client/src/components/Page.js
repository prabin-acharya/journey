const Page = ({ page }) => {
  return (
    <div>
      {page && <h1>{page.title}</h1>}
      <hr />
      {page && <p>{page.content}</p>}
    </div>
  );
};

export default Page;
