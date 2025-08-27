<!DOCTYPE html>
<html>
<head>
  <title>Admin Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    /* --- General Styles --- */
    :root {
      --bg-color: #f4f7fa;
      --card-bg-color: #ffffff;
      --header-bg-color: #ffffff;
      --text-color: #333;
      --border-color: #e0e0e0;
      --accent-color: #007bff;
      --danger-color: #dc3545;
      --danger-hover-color: #c82333;
      --shadow: 0 4px 8px rgba(0,0,0,0.05);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
    }

    /* --- Header --- */
    .header {
      background-color: var(--header-bg-color);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      box-shadow: var(--shadow);
    }

    .header h1 { font-size: 1.5rem; }
    .header .logout-link { text-decoration: none; color: var(--danger-color); font-weight: 500; }

    /* --- Main Dashboard Layout --- */
    .dashboard-container {
      padding: 2rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 992px) {
      .dashboard-container { grid-template-columns: 1fr 1fr; }
    }

    /* --- Card Style --- */
    .card {
      background-color: var(--card-bg-color);
      border-radius: 8px;
      box-shadow: var(--shadow);
      padding: 1.5rem;
    }
    .card h2 { margin-bottom: 1rem; font-size: 1.25rem; }

    /* --- Search Box --- */
    .search-box { margin-bottom: 1rem; }
    .search-box input[type="text"] {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      font-size: 1rem;
    }

    /* --- Table Styles --- */
    .table-wrapper { max-height: 400px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 5px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid var(--border-color); }
    th { background-color: #f9fafb; font-weight: 600; position: sticky; top: 0; }
    tbody tr:last-child td { border-bottom: none; }
    tbody tr:hover { background-color: #f5f5f5; }

    /* --- Button & Link Styles --- */
    .btn { display: inline-block; text-decoration: none; text-align: center; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; font-weight: 500; transition: background-color 0.2s; }
    .btn-danger { background-color: var(--danger-color); color: white; }
    .btn-danger:hover { background-color: var(--danger-hover-color); }
    .ip-list-trigger { color: var(--accent-color); text-decoration: underline; cursor: pointer; font-weight: 500; }

    /* --- NEW: Modal Styles --- */
    .modal {
      display: none; /* Hidden by default */
      position: fixed;
      z-index: 1000;
      left: 0; top: 0;
      width: 100%; height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.5);
      align-items: center;
      justify-content: center;
    }
    .modal.show { display: flex; } /* Show the modal */
    .modal-content {
      background-color: var(--card-bg-color);
      margin: auto;
      padding: 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      position: relative;
    }
    .modal-close {
      position: absolute;
      top: 10px; right: 20px;
      color: #aaa;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }
    .modal-close:hover { color: #000; }
    .modal-header h3 { font-size: 1.25rem; margin-bottom: 1rem; word-break: break-all; }
    .modal-body { line-height: 1.8; color: #555; }
    .modal-body div { padding: 2px 0; }
  </style>
</head>
<body>
  
  <header class="header">
    <h1>IPTV Admin Dashboard</h1>
    <a href="/logout" class="logout-link">🔒 Logout</a>
  </header>

  <main class="dashboard-container">
    <div class="card">
      <h2>Active Tokens</h2>
      <div class="search-box">
        <input type="text" id="tokenSearch" placeholder="Search tokens...">
      </div>
      <div class="table-wrapper">
        <table id="tokensTable">
          <thead>
            <tr>
              <th>Token</th>
              <th>Expires</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {{ROWS}}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <h2>⚠️ Abuse Report</h2>
      <div class="search-box">
        <input type="text" id="abuseSearch" placeholder="Search abuse logs...">
      </div>
      <div class="table-wrapper">
        <table id="abuseTable">
          <thead>
            <tr>
              <th>Token</th>
              <th>IPs</th>
              <th>Last Access</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {{ABUSE_ROWS}}
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <div id="ipModal" class="modal">
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <div class="modal-header">
        <h3 id="modalIpTitle"></h3>
      </div>
      <div id="modalIpBody" class="modal-body"></div>
    </div>
  </div>

  <script>
    // --- Table Filtering Functionality ---
    const filterTable = (inputId, tableId) => {
      const input = document.getElementById(inputId);
      const table = document.getElementById(tableId);
      input.addEventListener("keyup", () => {
        const filter = input.value.toLowerCase();
        const rows = table.getElementsByTagName("tr");
        for (let i = 1; i < rows.length; i++) {
          const text = rows[i].innerText.toLowerCase();
          rows[i].style.display = text.includes(filter) ? "" : "none";
        }
      });
    };
    filterTable("tokenSearch", "tokensTable");
    filterTable("abuseSearch", "abuseTable");

    // --- NEW: IP List Modal Functionality ---
    const ipModal = document.getElementById('ipModal');
    const modalTitle = document.getElementById('modalIpTitle');
    const modalBody = document.getElementById('modalIpBody');
    const closeModalBtn = ipModal.querySelector('.modal-close');

    // Function to close the modal
    const closeModal = () => {
      ipModal.classList.remove('show');
    };

    // Event listener to open the modal
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('ip-list-trigger')) {
        event.preventDefault(); // Stop link from navigating
        
        const token = event.target.dataset.token;
        const ips = event.target.dataset.ips.split(','); // Get IPs from data attribute and split into an array
        
        // Populate the modal
        modalTitle.innerText = `IP List for ${token}`;
        modalBody.innerHTML = ''; // Clear previous IPs
        ips.forEach(ip => {
          const ipElement = document.createElement('div');
          ipElement.textContent = ip.trim();
          modalBody.appendChild(ipElement);
        });

        // Show the modal
        ipModal.classList.add('show');
      }
    });

    // Event listeners to close the modal
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
      if (event.target === ipModal) {
        closeModal();
      }
    });
  </script>

</body>
</html>
