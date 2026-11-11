const repositoryList = document.querySelector("#repositories");
const statusMessage = document.querySelector("#status");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("The repository data must be a list.");
    }

    for (const repository of repositories) {
      const item = document.createElement("li");
      item.className = "repository";

      const heading = document.createElement("h2");
      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;
      heading.append(link);

      const description = document.createElement("p");
      description.textContent = repository.description;

      const starredAt = document.createElement("time");
      starredAt.dateTime = repository.starred_at;
      starredAt.textContent = `Starred on ${repository.starred_at}`;

      item.append(heading, description, starredAt);
      repositoryList.append(item);
    }

    statusMessage.textContent = repositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    console.error("Failed to load starred repositories:", error);
    statusMessage.textContent =
      "Could not load starred repositories. Please try again later.";
  }
}

loadRepositories();
