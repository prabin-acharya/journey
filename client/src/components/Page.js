const Page = ({ page }) => {
  return (
    <div>
      <h1>{page.title}</h1>
      <hr />
      <br />
      <p>{page.content}</p>
    </div>
  );
};

export default Page;
