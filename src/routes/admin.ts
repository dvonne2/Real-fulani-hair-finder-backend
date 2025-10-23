import { Router, Request, Response } from 'express';
import { basicAuth } from '../middleware/basicAuth';
import { QuizResult } from '../models';

const router = Router();

// All admin routes require Basic Auth
router.use(basicAuth);

function htmlLayout(title: string, body: string) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif; margin:20px;}
    table{border-collapse: collapse; width:100%;}
    th,td{border:1px solid #e5e7eb; padding:8px 10px; font-size:14px;}
    th{background:#f9fafb; text-align:left;}
    tr:nth-child(even){background:#fafafa}
    .muted{color:#6b7280}
    .badge{display:inline-block; padding:2px 6px; font-weight:700; border-radius:9999px; font-size:12px; background:#10b981; color:white}
    a{color:#2563eb; text-decoration:none}
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

router.get('/', async (_req: Request, res: Response) => {
  const items = await QuizResult.findAll({ order: [['createdAt','DESC']], limit: 200 });
  const rows = items.map((r: any) => `
    <tr>
      <td>${r.id}</td>
      <td>${r.name ?? '<span class="muted">—</span>'}</td>
      <td>${r.email ?? '<span class="muted">—</span>'}</td>
      <td>${r.phone ?? '<span class="muted">—</span>'}</td>
      <td>${r.state ?? '<span class="muted">—</span>'}</td>
      <td class="muted">${new Date(r.createdAt).toLocaleString()}</td>
      <td><a href="/admin/result/${r.id}">View</a></td>
    </tr>`).join('');
  const body = `
    <h1>Quiz Results <span class="badge">${items.length}</span></h1>
    <p class="muted">Latest 200 entries</p>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>WhatsApp</th>
          <th>State</th>
          <th>Created</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
  res.type('html').send(htmlLayout('Admin • Quiz Results', body));
});

router.get('/result/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const r: any = await QuizResult.findByPk(id);
  if (!r) return res.status(404).type('html').send(htmlLayout('Not Found', '<h1>Not Found</h1>'));
  const body = `
    <p><a href="/admin">← Back to list</a></p>
    <h1>Result #${r.id}</h1>
    <h2>Customer</h2>
    <ul>
      <li><strong>Name:</strong> ${r.name ?? '—'}</li>
      <li><strong>Email:</strong> ${r.email ?? '—'}</li>
      <li><strong>WhatsApp:</strong> ${r.phone ?? '—'}</li>
      <li><strong>State:</strong> ${r.state ?? '—'}</li>
      <li><strong>Created:</strong> ${new Date(r.createdAt).toLocaleString()}</li>
    </ul>
    <h2>Recommendation</h2>
    <pre style="white-space:pre-wrap; background:#f8fafc; padding:12px; border:1px solid #e5e7eb; border-radius:8px;">${JSON.stringify(r.recommendation, null, 2)}</pre>
    <h2>Answers</h2>
    <pre style="white-space:pre-wrap; background:#f8fafc; padding:12px; border:1px solid #e5e7eb; border-radius:8px;">${JSON.stringify(r.answers, null, 2)}</pre>
  `;
  res.type('html').send(htmlLayout(`Admin • Result #${r.id}`, body));
});

export default router;
