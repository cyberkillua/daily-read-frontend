document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://dailyread-vj86.onrender.com/v1/posts"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Full API response:", data);

    const articlesArray = data.sort(
      (b, a) => new Date(b.published_at) - new Date(a.published_at)
    );
    const contentContainer = document.querySelector(".content-container");

    // Clear existing dynamic content
    contentContainer.innerHTML = "";

    articlesArray.forEach((article, index) => {
      // Create a new container for each article
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
      // Create date element
      const datePublished = document.createElement("p");
      datePublished.classList.add("article-link");
      datePublished.textContent = formattedDate;

      // Create link element
      const articleLink = document.createElement("a");
      articleLink.href = article.url;

      // Create title element
      const titleArticle = document.createElement("p");
      titleArticle.classList.add("title-article");
      titleArticle.textContent = article.title;

      // Assemble the container
      articleLink.appendChild(titleArticle);
      newContainer.appendChild(datePublished);
      newContainer.appendChild(articleLink);

      // Add to the parent
      contentContainer.parentNode.insertBefore(
        newContainer,
        contentContainer.nextSibling
      );
    });

    // Optionally remove the original static container
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
