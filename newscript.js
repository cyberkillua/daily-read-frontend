document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://dailyread-production.up.railway.app/v1/posts"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const articlesArray = data.sort(
      (b, a) => new Date(a.published_at) - new Date(b.published_at)
    );
    const contentContainer = document.querySelector(".blog-list");

    contentContainer.innerHTML = "";

    articlesArray.forEach((article) => {
      const newContainer = document.createElement("li");
      newContainer.classList.add("blog-item");

      const formattedDate = new Date(article.published_at).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      const blogMeta = document.createElement("div");
      blogMeta.classList.add("blog-meta");

      const blogSource = document.createElement("span");
      blogSource.classList.add("blog-source");
      blogSource.textContent = article.postname;

      const blogDate = document.createElement("span");
      blogDate.classList.add("blog-date");
      blogDate.textContent = formattedDate;

      blogMeta.appendChild(blogSource);
      blogMeta.appendChild(blogDate);

      const titleArticle = document.createElement("h2");
      titleArticle.classList.add("blog-title");

      const articleLink = document.createElement("a");
      articleLink.href = article.url;
      articleLink.target = "_blank";
      articleLink.textContent = article.title;

      titleArticle.appendChild(articleLink);

      newContainer.appendChild(titleArticle);
      newContainer.appendChild(blogMeta);

      contentContainer.appendChild(newContainer);
    });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    const contentContainer = document.querySelector(".blog-list");
    contentContainer.innerHTML = `
        <li class="blog-item">
          <h2 class="blog-title">Error</h2>
          <div class="blog-meta">
            <span class="blog-source">Failed to load articles. Please try again later.</span>
          </div>
        </li>
      `;
  }
});
