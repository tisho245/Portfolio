 // Language selection
 const languageSelect = document.getElementById('language-select');
 const aboutContent = document.getElementById('about-content');
 const contactContent1 = document.getElementById('contact-content1');
 const contactContent2 = document.getElementById('contact-content2');
 const fullName = document.getElementById("FullName");
 const about = document.getElementById("about");
 const project = document.getElementById("project");
 const contact = document.getElementById("contact");
 const li1 = document.getElementById('li1');
 const li2 = document.getElementById('li2');
 const li3 = document.getElementById('li3');
 const email = "tihomir.petkov@hotmail.com";

 languageSelect.addEventListener('change', () => {
     const selectedLanguage = languageSelect.value;

     if (selectedLanguage === 'en') {
         about.textContent = "About Me";
         project.textContent = "Projects";
         contact.textContent = "Contact";
         li1.textContent = "About Me";
         li2.textContent = "Projects";
         li3.textContent = "Contact";
         fullName.textContent = "Tihomir Petkov";
         aboutContent.textContent = "Hello! I am Tihomir Petkov, a dedicated student of informatics, honing my skills in various programming languages. I enjoy researching open-source projects and sharing knowledge.";
         contactContent1.textContent = 'Email address: ' + email;
         contactContent2.textContent = 'LinkedIn profile: ';
     } else if (selectedLanguage === 'bg') {
         about.textContent = "За Мен";
         project.textContent = "Проекти";
         contact.textContent = "Контакти";
         li1.textContent = "За Мен";
         li2.textContent = "Проекти";
         li3.textContent = "Контакти";
         fullName.textContent = "Тихомир Петков";
         aboutContent.textContent = 'Здравейте! Аз съм Тихомир Петков, отдаден ученик на информатиката. Обичам да изследвам проекти с отворен код и да споделям знанията си.';
         contactContent1.textContent = 'Имейл адрес: ' + email;
         contactContent2.textContent = 'Профил в LinkedIn: ';
     } else if (selectedLanguage === 'de') {
         about.textContent = "Über Mich";
         project.textContent = "Projekte";
         fullName.textContent = "Tihomir Petkov";
         contact.textContent = "Kontakte";
         li1.textContent = "Über Mich";
         li2.textContent = "Projekte";
         li3.textContent = "Kontakte";
         aboutContent.textContent = 'Hallo! Ich bin Tihomir Petkov, ein engagierter Informatikstudent. Ich erforsche gerne Open-Source-Projekte und teile mein Wissen.';
         contactContent1.textContent = 'E-Mail-Adresse: ' + email;
         contactContent2.textContent = 'LinkedIn-Profil: ';
     }
 });
 function fetchAndDisplayProjects() { 
const githubUsername = "tisho245";
const giteaUsername = "tisho";
const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos`;
const giteaApiUrl = `http://tishocloud.duckdns.org:3002/api/v1/users/${giteaUsername}/repos`;

const fetchGitHubProjects = fetch(githubApiUrl)
 .then(response => {
     if (!response.ok) throw new Error('GitHub fetch error');
     return response.json();
 })
 .then(data => data.map(repo => ({
     source: 'GitHub',
     name: repo.name,
     description: repo.description || 'No description available.',
     url: repo.html_url,
     language: repo.language || 'Other'
 })));

const fetchGiteaProjects = fetch(giteaApiUrl)
 .then(response => {
     if (!response.ok) throw new Error('Gitea fetch error');
     return response.json();
 })
 .then(data => data.map(repo => ({
     source: 'Gitea',
     name: repo.name,
     description: repo.description || 'No description available.',
     url: repo.html_url,
     language: repo.language || 'Other'
 })));

Promise.all([fetchGitHubProjects, fetchGiteaProjects])
 .then(results => {
     const projects = results.flat();
     const projectList = document.getElementById("project-list");
     projectList.innerHTML = ""; // Clear existing projects

     const languageMap = {};

     // Group projects by language
     projects.forEach(repo => {
         const language = repo.language;
         languageMap[language] = languageMap[language] || [];
         languageMap[language].push(repo);
     });

     // Display projects grouped by language
     Object.entries(languageMap).forEach(([language, repos]) => {
         const languageSection = document.createElement('div');
         languageSection.innerHTML = `<h3>${language}</h3>`;
         repos.forEach(repo => {
             const projectItem = document.createElement('div');
             projectItem.className = 'project';
             projectItem.innerHTML = `
                 <h4>${repo.name} (${repo.source})</h4>
                 <p>${repo.description}</p>
                 <a href="${repo.url}" target="_blank">View on ${repo.source}</a>
             `;
             languageSection.appendChild(projectItem);
         });
         projectList.appendChild(languageSection);
     });
 })
 .catch(error => console.error('Error fetching projects:', error));
}

// Call the function to display projects from GitHub and Gitea
fetchAndDisplayProjects();
