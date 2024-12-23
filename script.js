document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://web-jpzt58zez9q3.up-de-fra1-k8s-1.apps.run-on-seenode.com/v1/posts"
    );
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const articlesArray = data.sort(
      (b, a) => new Date(b.published_at) - new Date(a.published_at)
    );
    const contentContainer = document.querySelector(".content-container");

    contentContainer.innerHTML = "";

    articlesArray.forEach((article, index) => {
      const newContainer = document.createElement("div");
      newContainer.classList.add("content-container");

      const formattedDate = new Date(article.published_at).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      const nameAndDate = `${article.postname} | ${formattedDate}`;

      //   const datePublished = document.createElement("p");
      //   datePublished.classList.add("article-link");
      //   datePublished.textContent = formattedDate;

      const postname = document.createElement("p");
      postname.classList.add("article-name");
      postname.textContent = nameAndDate;

      const articleLink = document.createElement("a");
      articleLink.target = "_blank";
      articleLink.href = article.url;

      const titleArticle = document.createElement("p");
      titleArticle.classList.add("title-article");
      titleArticle.textContent = article.title;

      articleLink.appendChild(titleArticle);
      newContainer.appendChild(postname);
      newContainer.appendChild(articleLink);

      contentContainer.parentNode.insertBefore(
        newContainer,
        contentContainer.nextSibling
      );
    });

    contentContainer.remove();
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    const errorContainer = document.querySelector(".content-container");
    if (errorContainer) {
      errorContainer.innerHTML = `
          <p class="article-link">Error</p>
          <a href="#">
            <p class="title-article">Failed to load articles. Please try again later.</p>
          </a>
        `;
    }
  }
});
