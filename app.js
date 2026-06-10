/*
  Starry Night Admin Dashboard - client-side mock logic
  - Sidebar navigation: show correct section
  - Refresh: populate mock statistics
  - Modals: simple in-page form population via data attributes
*/

(function () {
  const sections = Array.from(
    document.querySelectorAll('.bb-page[data-page-section]')
  );
  const navLinks = Array.from(document.querySelectorAll('.bb-nav-link'));

  function setActiveSection(page) {
    sections.forEach((s) => {
      const isTarget = s.getAttribute('data-page-section') === page;
      s.classList.toggle('active', isTarget);
    });
  }

  function setActiveNavLink(page) {
    navLinks.forEach((x) => {
      const isTarget = (x.dataset.page || 'overview') === page;
      x.classList.toggle('active', isTarget);
    });
  }

  // NOTE: Navigation between pages (index.html/users.html/products.html/orders.html)
  // is handled by standard anchor links (no JS navigation). We intentionally
  // do not intercept click events here.

  // Initialize nothing here (each HTML page controls its own visible section).


  // Sidebar toggles (desktop nav hidden on mobile)
  function bindToggle(btnId, sidebarId) {
    const btn = document.getElementById(btnId);
    const sidebar = document.getElementById(sidebarId);
    if (!btn || !sidebar) return;

    btn.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  bindToggle('bbSidebarToggle', 'bbSidebar');
  bindToggle('bbSidebarToggle2', 'bbSidebar');

  // Mock stats
  const stats = {
    totalUsers: document.getElementById('statTotalUsers'),
    activeProducts: document.getElementById('statActiveProducts'),
    totalRevenue: document.getElementById('statTotalRevenue'),
    pendingOrders: document.getElementById('statPendingOrders'),
  };

  function formatMoney(n) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  }

  function refreshStats() {
    const totalUsers = 1280 + Math.floor(Math.random() * 120);
    const activeProducts = 84 + Math.floor(Math.random() * 12);
    const totalRevenue = 482000 + Math.floor(Math.random() * 90000);
    const pendingOrders = 6 + Math.floor(Math.random() * 8);

    if (stats.totalUsers) stats.totalUsers.textContent = totalUsers;
    if (stats.activeProducts) stats.activeProducts.textContent = activeProducts;
    if (stats.totalRevenue) stats.totalRevenue.textContent = formatMoney(totalRevenue);
    if (stats.pendingOrders) stats.pendingOrders.textContent = pendingOrders;
  }

  document.getElementById('btnRefresh')?.addEventListener('click', refreshStats);
  refreshStats();

  // Modal helpers
  // When clicking Edit/User/Product buttons, we populate the form fields from data-* attributes.
  function bindEditButtons({ buttonSelector, modalId, formMap }) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;

    document.querySelectorAll(buttonSelector).forEach((btn) => {
      btn.addEventListener('click', () => {
        Object.entries(formMap).forEach(([dataKey, inputId]) => {
          const v = btn.getAttribute(dataKey);
          const input = document.getElementById(inputId);
          if (input && v != null) input.value = v;
        });
      });
    });
  }

  // Users edit
  bindEditButtons({
    buttonSelector: '[data-action="edit-user"]',
    modalId: 'modalEditUser',
    formMap: {
      'data-user-id': 'userId',
      'data-full-name': 'userFullName',
      'data-email': 'userEmail',
      'data-password': 'userPassword',
      'data-code': 'userCode',
    },
  });

  // Products edit
  bindEditButtons({
    buttonSelector: '[data-action="edit-product"]',
    modalId: 'modalEditProduct',
    formMap: {
      'data-product-id': 'productId',
      'data-name': 'productName',
      'data-price': 'productPrice',
      'data-quantity': 'productQuantity',
      'data-sold': 'productSold',
      'data-category': 'productCategory',
      'data-description': 'productDescription',
    },
  });

  // Simple status update controls for orders
  document.querySelectorAll('[data-order-status]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const status = btn.getAttribute('data-order-status');
      const orderId = btn.getAttribute('data-order-id');
      const badge = document.getElementById(`badge-order-${orderId}`);
      if (!badge) return;

      badge.classList.remove('badge-order-pending', 'badge-order-accepted', 'badge-order-rejected');
      if (status === 'pending') badge.classList.add('badge-order-pending');
      if (status === 'accepted') badge.classList.add('badge-order-accepted');
      if (status === 'rejected') badge.classList.add('badge-order-rejected');

      badge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    });
  });
})();



