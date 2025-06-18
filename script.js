document.getElementById('myplanet').addEventListener('click', function() {
    this.style.backgroundColor = 'yellow';
    this.style.color = 'black';
});

window.addEventListener('load', function() {
    loadSystemName();
    
    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener("click", function() {
            window.location.href = 'solar-system.html';
        });
    });
    
    document.querySelectorAll('.planet-orbit img, .sun img').forEach(img => {
        img.addEventListener("click", function() {
            let planetName = this.closest('[data-name]').dataset.name;
            showPopup(planetName);
        });
    });


    
    let saveBtn = document.getElementById('save-name');
    if (saveBtn) {
        saveBtn.addEventListener("click", function() {
            let input = document.getElementById('system-input');
            let systemName = input.value.trim();
            if (systemName) {
                document.getElementById('system-name').textContent = systemName;
                localStorage.setItem('solarSystemName', systemName);
                
                if (systemName.toLowerCase() === 'abc123') {
                    showEasterEgg();
                } else {
                    hideEasterEgg();
                }
                
                input.value = '';
            }
        });
    }
    
    let closeBtn = document.getElementById('close-popup');
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            hidePopup();
        });
    }
    
    let popup = document.getElementById('planet-popup');
    if (popup) {
        popup.addEventListener("click", function(e) {
            if (e.target === popup) {
                hidePopup();
            }
        });
    }
});

function showPopup(planetName) {
    let popup = document.getElementById('planet-popup');
    let title = document.getElementById('popup-title');
    if (popup && title) {
        title.textContent = planetName;
        popup.classList.add('show');
    }
}

function hidePopup() {
    let popup = document.getElementById('planet-popup');
    if (popup) {
        popup.classList.remove('show');
    }
}

function loadSystemName() {
    let saved = localStorage.getItem('solarSystemName');
    let nameElement = document.getElementById('system-name');
    if (saved && nameElement) {
        nameElement.textContent = saved;
        if (saved.toLowerCase() === 'abc123') {
            showEasterEgg();
        }
    }
}

function showEasterEgg() {
    let existing = document.getElementById('easter-star');
    if (!existing) {
        let star = document.createElement('div');
        star.id = 'easter-star';
        star.className = 'easter-star';
        star.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" 
                      fill="url(#starGradient)" 
                      stroke="#FFD700" 
                      stroke-width="0.5"/>
                <defs>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#FFD700"/>
                        <stop offset="50%" style="stop-color:#FFA500"/>
                        <stop offset="100%" style="stop-color:#FF6B35"/>
                    </linearGradient>
                </defs>
            </svg>
        `;
        document.body.appendChild(star);
    }
}

function hideEasterEgg() {
    let star = document.getElementById('easter-star');
    if (star) {
        star.remove();
    }
}
