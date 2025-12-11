// src/scripts/admin-client.js
import CMS from 'decap-cms-app';
import BlogPostPreview from '../admin/previews.js';

// Register preview components
CMS.registerPreviewTemplate('blog', BlogPostPreview);

// If the package ships a stylesheet, import it here (adjust path if necessary):
// import 'decap-cms-app/dist/decap-cms.css';

const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const configPath = isProduction ? '/admin/config.yml' : '/admin/config-local.yml';

CMS.init({ config: configPath });
