const issuesGrid = document.getElementById('issuesGrid');
const searchInput = document.getElementById('searchInput');
const issueCountText = document.getElementById('issueCount');
const issueModal = document.getElementById('issueModal');
const modalContent = document.getElementById('modalContent');

let allIssues = [];
let currentFilter = 'all';

async function fetchIssues() {
    try {
        const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const result = await response.json();
        if (result.status === 'success') {
            allIssues = result.data;
            renderIssues(allIssues);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function renderIssues(issues) {
    issuesGrid.innerHTML = '';
    issueCountText.innerText = `${issues.length} Issues`;

    issues.forEach(issue => {
        const isClosed = issue.status === 'closed';
        const borderColor = isClosed ? 'border-indigo-400' : 'border-emerald-400';
        const iconColor = isClosed ? 'text-indigo-500' : 'text-emerald-500';
        
        const card = document.createElement('div');
        card.className = `issue-card bg-white p-5 rounded-xl border-t-4 ${borderColor} shadow-sm cursor-pointer hover:shadow-md transition-all`;
        card.onclick = () => openModal(issue.id);

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <i class="fa-regular fa-circle-dot ${iconColor}"></i>
                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${issue.priority === 'high' ? 'bg-red-100 text-red-600' : issue.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600'}">
                    ${issue.priority}
                </span>
            </div>
            <h3 class="font-bold text-slate-800 text-sm mb-2 line-clamp-2">${issue.title}</h3>
            <p class="text-xs text-gray-500 mb-4 line-clamp-2">${issue.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${issue.labels.map(label => `<span class="text-[10px] font-bold px-2 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100 uppercase">${label}</span>`).join('')}
            </div>
            <div class="pt-3 border-t text-[10px] text-gray-400 flex flex-col gap-1">
                <span>#${issue.id} by ${issue.author}</span>
                <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        `;
        issuesGrid.appendChild(card);
    });
}

function filterIssues(type) {
    currentFilter = type;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('text-gray-600');
    });
    document.getElementById(`btn-${type}`).classList.add('bg-indigo-600', 'text-white');

    let filtered = allIssues;
    if (type === 'open') filtered = allIssues.filter(i => i.status === 'open');
    if (type === 'closed') filtered = allIssues.filter(i => i.status === 'closed');
    
    renderIssues(filtered);
}

searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
        try {
            const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
            const result = await response.json();
            renderIssues(result.data || []);
        } catch (error) {
            console.error("Search error:", error);
        }
    } else {
        filterIssues(currentFilter);
    }
});

async function openModal(id) {
    try {
        const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const result = await response.json();
        const issue = result.data;

        modalContent.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h2 class="text-2xl font-bold text-slate-800">${issue.title}</h2>
                <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div class="flex gap-2 mb-6">
                <span class="px-3 py-1 rounded-full text-xs font-bold ${issue.status === 'open' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'} capitalize">${issue.status}</span>
                <span class="text-gray-400 text-xs mt-1">Opened by <b>${issue.author}</b> • ${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="flex gap-2 mb-6">
                ${issue.labels.map(l => `<span class="px-2 py-1 rounded bg-orange-100 text-orange-600 text-[10px] font-bold uppercase">${l}</span>`).join('')}
            </div>
            <p class="text-gray-600 mb-8 leading-relaxed">${issue.description}</p>
            
            <div class="grid grid-cols-2 gap-4 pt-6 border-t">
                <div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase">Assignee:</p>
                    <p class="font-bold text-slate-700">${issue.assignee || 'Unassigned'}</p>
                </div>
                <div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase">Priority:</p>
                    <span class="px-3 py-1 rounded-full text-[10px] font-black bg-red-500 text-white uppercase">${issue.priority}</span>
                </div>
            </div>
            <button onclick="closeModal()" class="w-full mt-8 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">Close</button>
        `;
        issueModal.classList.remove('hidden');
    } catch (error) {
        console.error("Modal fetch error:", error);
    }
}

function closeModal() {
    issueModal.classList.add('hidden');
}

fetchIssues();