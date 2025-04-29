async function fetchData() {
    try {
      const response = await axios.get("js/data.json");
      const { user, skills, services, experiences } = response.data;
      document.getElementById('profile').innerHTML = `
        <div class="d-flex align-items-center mb-2">
          <div class="profile-avatar me-3">
            <img src="${user.linkPhoto}" alt="Photo" />
          </div>
          <div>
            <h4 class="text-accent mb-0">${user.nom} <br> ${user.prenom}</h4>
            <p class="fw-bold mt-1 mb-0">${user.profil}</p>
            <small class="text-muted" id="cont">${user.telephone} | ${user.email}</small>
          </div>
        </div>
        <small class="mb-3">${user.bio.replace(/\n/g, "<br>")}</small>
        <br>
        <a href="./assets/cv/cv.pdf" target="_blank" class="btn btn-accent rounded-0 btn-sm mt-2 px-4">
          <i class="bi bi-filetype-pdf"></i> &nbsp; CV
        </a>
      `;
      let servicesHtml = ``;
      services.forEach((service, index) => {
        servicesHtml += `
          <div class="accordion mb-2" id="accordionService${index}">
            <div class="accordion-item bg-transparent text-light border-0">
              <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button text-accent" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                  # ${service.label}
                </button>
              </h2>
              <div id="collapse${index}" class="accordion-collapse collapse show" aria-labelledby="heading${index}" data-bs-parent="#accordionService${index}">
                <div class="accordion-body small">${service.description}</div>
              </div>
            </div>
          </div>
        `;
      });
      document.getElementById('services').innerHTML = servicesHtml;
      const skillsHtml = skills.map(skill => `
        <div class="skill-item col-12 col-sm-6 col-md-4 mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span><i class="${skill.icon} me-2 text-accent"></i>${skill.nom}</span>
            <small>${skill.niveau}%</small>
          </div>
          <div class="progress skill-bar">
            <div class="progress-bar" role="progressbar" style="width:${skill.niveau}%"></div>
          </div>
        </div>
      `).join('');
      document.getElementById('skills').innerHTML = `<div class="row">${skillsHtml}</div>`;
      const experiencesPerPage = 2;
      const totalPages = Math.ceil(experiences.length / experiencesPerPage);
      window.renderExperiences = function (page) {
        const startIndex = (page - 1) * experiencesPerPage;
        const endIndex = startIndex + experiencesPerPage;
        const experiencesPage = experiences.slice(startIndex, endIndex);
        const experiencesHtml = experiencesPage.map(exp => `
          <div class="col-md-6 p-2">
            <div class="exp-card p-3 mb-3 border rounded-0 text-light">
              <h6 class="text-accent">${exp.titre}</h6>
              <small class="text-muted">${exp.type} | ${exp.entreprise} | ${exp.date}</small>
              <p class="mt-2">${exp.description}</p>
              <div class="mb-2">
                ${exp.technologies.map(tech => `<span class="badge bg-secondary me-1">${tech}</span>`).join('')}
              </div>
              <div class="d-flex gap-2">
                
                <a href="${exp.source}" target="_blank" class="btn btn-sm btn-outline-light">
                  <i class="bi bi-github"></i> Code Source
                </a>
              </div>
            </div>
          </div>
        `).join('');
        document.getElementById('experiences').innerHTML = experiencesHtml;
        let paginationHtml = `<ul class="pagination justify-content-center mt-3">`;
        for (let i = 1; i <= totalPages; i++) {
          paginationHtml += `
            <li class="page-item ${i === page ? 'active' : ''}">
              <button class="page-link" onclick="renderExperiences(${i})">${i}</button>
            </li>
          `;
        }
        paginationHtml += `</ul>`;
        document.getElementById('pagination').innerHTML = paginationHtml;
      };
      renderExperiences(1);
      document.getElementById('footer').innerHTML = `
        <p id="foot">&copy; 2025 ${user.prenom}. Tous droits réservés.</p>
        <p>
          <a href="${user.linkedin}" target="_blank" class="text-white">
            <i class="bi bi-linkedin"></i> LinkedIn
          </a> |
          <a href="${user.github}" target="_blank" class="text-white">
            <i class="bi bi-github"></i> GitHub
          </a>
        </p>
      `;
    } catch (error) {
      console.error("Erreur de chargement des données", error);
    }
  }
  window.onload = fetchData;
  
                // <a href="${exp.lien}" target="_blank" class="btn btn-sm btn-outline-light">
                //   <i class="bi bi-box-arrow-up-right"></i> Voir Projet
                // </a>
                
                