const { ipcRenderer } = require('electron');

let rewardIdCounter = 0;
let attachmentIdCounter = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
    addReward(); // Add first reward by default

    // Event listeners
    document.getElementById('addRewardBtn').addEventListener('click', addReward);
    document.getElementById('lootPoolName').addEventListener('input', updatePreview);
    document.getElementById('saveBtn').addEventListener('click', saveFile);
    document.getElementById('openBtn').addEventListener('click', openFile);
    document.getElementById('exportBtn').addEventListener('click', exportJSON);
});

// Add new reward
function addReward() {
    const rewardId = rewardIdCounter++;
    const container = document.getElementById('rewardsContainer');

    const rewardCard = document.createElement('div');
    rewardCard.className = 'reward-card collapsed';
    rewardCard.id = `reward-${rewardId}`;

    rewardCard.innerHTML = `
        <div class="reward-header clickable" onclick="toggleReward(${rewardId})">
            <div class="reward-info">
                <span class="reward-title">Reward #${rewardId + 1}</span>
                <span class="reward-name-preview">Click to expand</span>
            </div>
            <div class="reward-actions">
                <span class="expand-icon">▼</span>
                <button class="btn btn-danger btn-small" onclick="event.stopPropagation(); removeReward(${rewardId})">🗑️</button>
            </div>
        </div>
        
        <div class="reward-content" style="display: none;">
            <div class="input-group">
                <label>Item Name:</label>
                <input type="text" class="reward-name" placeholder="e.g., Snafu_ScarH_Tan_GUN" onchange="updateRewardPreview(${rewardId}); updatePreview()">
            </div>
            
            <div class="grid-3">
                <div class="input-group">
                    <label>Chance to Spawn:</label>
                    <input type="number" class="reward-chance" value="1" step="0.01" min="0" max="1" onchange="updatePreview()">
                </div>
                
                <div class="input-group">
                    <label>Quantity Min:</label>
                    <input type="number" class="reward-min" value="1" min="1" onchange="updatePreview()">
                </div>
                
                <div class="input-group">
                    <label>Quantity Max:</label>
                    <input type="number" class="reward-max" value="1" min="1" onchange="updatePreview()">
                </div>
            </div>
            
            <div class="attachments-section">
                <div class="attachments-header">
                    <h4>Attachments</h4>
                    <button class="btn btn-add btn-small" onclick="addAttachment(${rewardId})">+ Add Attachment</button>
                </div>
                <div id="attachments-${rewardId}"></div>
            </div>
        </div>
    `;

    container.appendChild(rewardCard);
    updatePreview();
}

// Toggle reward visibility
function toggleReward(rewardId) {
    const rewardCard = document.getElementById(`reward-${rewardId}`);
    const content = rewardCard.querySelector('.reward-content');
    const expandIcon = rewardCard.querySelector('.expand-icon');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        expandIcon.textContent = '▲';
        rewardCard.classList.remove('collapsed');
        rewardCard.classList.add('expanded');
    } else {
        content.style.display = 'none';
        expandIcon.textContent = '▼';
        rewardCard.classList.remove('expanded');
        rewardCard.classList.add('collapsed');
    }
}

// Update reward name preview
function updateRewardPreview(rewardId) {
    const rewardCard = document.getElementById(`reward-${rewardId}`);
    const nameInput = rewardCard.querySelector('.reward-name');
    const namePreview = rewardCard.querySelector('.reward-name-preview');

    if (nameInput.value.trim()) {
        namePreview.textContent = nameInput.value;
    } else {
        namePreview.textContent = 'Click to expand';
    }
}

// Remove reward
function removeReward(rewardId) {
    const element = document.getElementById(`reward-${rewardId}`);
    if (element) {
        element.remove();
        updatePreview();
    }
}

// Add attachment to reward
function addAttachment(rewardId) {
    const attachmentId = attachmentIdCounter++;
    const container = document.getElementById(`attachments-${rewardId}`);

    const attachmentCard = document.createElement('div');
    attachmentCard.className = 'attachment-card';
    attachmentCard.id = `attachment-${attachmentId}`;

    attachmentCard.innerHTML = `
        <div class="attachment-header">
            <span class="attachment-title">Attachment #${attachmentId + 1}</span>
            <button class="btn btn-danger btn-small" onclick="removeAttachment(${attachmentId})">🗑️</button>
        </div>
        
        <div class="input-group">
            <label>Attachment Name:</label>
            <input type="text" class="attachment-name" placeholder="e.g., SNAFU_ScarH_100RND_Mag_Tan" onchange="updatePreview()">
        </div>
        
        <div class="input-group">
            <label>Quantity:</label>
            <input type="number" class="attachment-quantity" value="1" min="1" onchange="updatePreview()">
        </div>
        
        <div class="random-names-container">
            <label>Random Names (Optional):</label>
            <div id="random-names-${attachmentId}">
                <div class="random-name-input">
                    <input type="text" class="random-name" placeholder="Enter random name" onchange="updatePreview()">
                    <button class="btn btn-add btn-small" onclick="addRandomName(${attachmentId})">+</button>
                </div>
            </div>
        </div>
        
        <div class="nested-attachments-section" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <label style="margin: 0; font-weight: 600;">Nested Attachments:</label>
                <button class="btn btn-add btn-small" onclick="addNestedAttachment(${attachmentId})">+ Add Nested</button>
            </div>
            <div id="nested-attachments-${attachmentId}"></div>
        </div>
    `;

    container.appendChild(attachmentCard);
    updatePreview();
}

// Remove attachment
function removeAttachment(attachmentId) {
    const element = document.getElementById(`attachment-${attachmentId}`);
    if (element) {
        element.remove();
        updatePreview();
    }
}

// Add random name field
function addRandomName(attachmentId) {
    const container = document.getElementById(`random-names-${attachmentId}`);
    const div = document.createElement('div');
    div.className = 'random-name-input';
    div.innerHTML = `
        <input type="text" class="random-name" placeholder="Enter random name" onchange="updatePreview()">
        <button class="btn btn-danger btn-small" onclick="this.parentElement.remove(); updatePreview();">-</button>
    `;
    container.appendChild(div);
}

// Add nested attachment
function addNestedAttachment(parentAttachmentId) {
    const nestedId = attachmentIdCounter++;
    const container = document.getElementById(`nested-attachments-${parentAttachmentId}`);

    const nestedCard = document.createElement('div');
    nestedCard.className = 'attachment-card';
    nestedCard.style.marginLeft = '20px';
    nestedCard.style.borderLeft = '3px solid #667eea';
    nestedCard.id = `nested-attachment-${nestedId}`;

    nestedCard.innerHTML = `
        <div class="attachment-header">
            <span class="attachment-title">Nested Attachment</span>
            <button class="btn btn-danger btn-small" onclick="removeNestedAttachment(${nestedId})">🗑️</button>
        </div>
        
        <div class="input-group">
            <label>Name:</label>
            <input type="text" class="nested-attachment-name" placeholder="Enter name" onchange="updatePreview()">
        </div>
        
        <div class="input-group">
            <label>Quantity:</label>
            <input type="number" class="nested-attachment-quantity" value="1" min="1" onchange="updatePreview()">
        </div>
    `;

    container.appendChild(nestedCard);
    updatePreview();
}

// Remove nested attachment
function removeNestedAttachment(nestedId) {
    const element = document.getElementById(`nested-attachment-${nestedId}`);
    if (element) {
        element.remove();
        updatePreview();
    }
}

// Collect data from form
function collectData() {
    const lootPoolName = document.getElementById('lootPoolName').value;
    const rewards = [];

    const rewardCards = document.querySelectorAll('.reward-card');
    rewardCards.forEach(card => {
        const name = card.querySelector('.reward-name').value;
        if (!name) return; // Skip if no name

        const reward = {
            name: name,
            chanceToSpawn: parseFloat(card.querySelector('.reward-chance').value),
            quantityMin: parseInt(card.querySelector('.reward-min').value),
            quantityMax: parseInt(card.querySelector('.reward-max').value),
            attachments: []
        };

        // Collect attachments
        const attachmentCards = card.querySelectorAll('.attachment-card');
        attachmentCards.forEach(attCard => {
            // Skip nested attachments at this level
            if (attCard.id.startsWith('nested-attachment-')) return;

            const attName = attCard.querySelector('.attachment-name').value;
            if (!attName) return;

            const attachment = {
                name: attName,
                random_names: [],
                quantity: parseInt(attCard.querySelector('.attachment-quantity').value),
                attachments: []
            };

            // Collect random names
            const randomNameInputs = attCard.querySelectorAll('.random-name');
            randomNameInputs.forEach(input => {
                if (input.value.trim()) {
                    attachment.random_names.push(input.value.trim());
                }
            });

            // Collect nested attachments
            const nestedContainer = attCard.querySelector('[id^="nested-attachments-"]');
            if (nestedContainer) {
                const nestedCards = nestedContainer.querySelectorAll('.attachment-card');
                nestedCards.forEach(nestedCard => {
                    const nestedName = nestedCard.querySelector('.nested-attachment-name').value;
                    if (!nestedName) return;

                    attachment.attachments.push({
                        name: nestedName,
                        random_names: [],
                        quantity: parseInt(nestedCard.querySelector('.nested-attachment-quantity').value),
                        attachments: []
                    });
                });
            }

            reward.attachments.push(attachment);
        });

        rewards.push(reward);
    });

    return {
        lootPoolName: lootPoolName,
        rewards: rewards
    };
}

// Update JSON preview
function updatePreview() {
    const data = collectData();
    document.getElementById('jsonPreview').textContent = JSON.stringify(data, null, 2);
}

// Save file
async function saveFile() {
    const data = collectData();
    const result = await ipcRenderer.invoke('save-file', data);

    if (result.success) {
        alert('File saved successfully!');
    } else if (result.error !== 'Cancelled') {
        alert('Error saving file: ' + result.error);
    }
}

// Open file
async function openFile() {
    const result = await ipcRenderer.invoke('open-file');

    if (result.success) {
        loadData(result.data);
        alert('File loaded successfully!');
    } else if (result.error !== 'Cancelled') {
        alert('Error loading file: ' + result.error);
    }
}

// Load data into form
function loadData(data) {
    // Clear existing rewards
    document.getElementById('rewardsContainer').innerHTML = '';
    rewardIdCounter = 0;
    attachmentIdCounter = 0;

    // Set loot pool name
    document.getElementById('lootPoolName').value = data.lootPoolName || '';

    // Load rewards
    if (data.rewards && Array.isArray(data.rewards)) {
        data.rewards.forEach(reward => {
            const rewardId = rewardIdCounter;
            addReward();

            const rewardCard = document.getElementById(`reward-${rewardId}`);
            rewardCard.querySelector('.reward-name').value = reward.name || '';
            rewardCard.querySelector('.reward-chance').value = reward.chanceToSpawn || 1;
            rewardCard.querySelector('.reward-min').value = reward.quantityMin || 1;
            rewardCard.querySelector('.reward-max').value = reward.quantityMax || 1;

            // Update reward preview
            updateRewardPreview(rewardId);

            // Load attachments
            if (reward.attachments && Array.isArray(reward.attachments)) {
                reward.attachments.forEach(attachment => {
                    const attachmentId = attachmentIdCounter;
                    addAttachment(rewardId);

                    const attCard = document.getElementById(`attachment-${attachmentId}`);
                    attCard.querySelector('.attachment-name').value = attachment.name || '';
                    attCard.querySelector('.attachment-quantity').value = attachment.quantity || 1;

                    // Load random names
                    if (attachment.random_names && Array.isArray(attachment.random_names)) {
                        const randomNamesContainer = document.getElementById(`random-names-${attachmentId}`);
                        randomNamesContainer.innerHTML = '';

                        attachment.random_names.forEach((randomName, index) => {
                            const div = document.createElement('div');
                            div.className = 'random-name-input';
                            div.innerHTML = `
                                <input type="text" class="random-name" placeholder="Enter random name" value="${randomName}" onchange="updatePreview()">
                                ${index === 0 ?
                                    `<button class="btn btn-add btn-small" onclick="addRandomName(${attachmentId})">+</button>` :
                                    `<button class="btn btn-danger btn-small" onclick="this.parentElement.remove(); updatePreview();">-</button>`
                                }
                            `;
                            randomNamesContainer.appendChild(div);
                        });

                        if (attachment.random_names.length === 0) {
                            addRandomName(attachmentId);
                        }
                    }

                    // Load nested attachments
                    if (attachment.attachments && Array.isArray(attachment.attachments)) {
                        attachment.attachments.forEach(nested => {
                            const nestedId = attachmentIdCounter;
                            addNestedAttachment(attachmentId);

                            const nestedCard = document.getElementById(`nested-attachment-${nestedId}`);
                            nestedCard.querySelector('.nested-attachment-name').value = nested.name || '';
                            nestedCard.querySelector('.nested-attachment-quantity').value = nested.quantity || 1;
                        });
                    }
                });
            }
        });
    }

    updatePreview();
}

// Export JSON to clipboard
function exportJSON() {
    const data = collectData();
    const json = JSON.stringify(data, null, 2);

    navigator.clipboard.writeText(json).then(() => {
        alert('JSON copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}
