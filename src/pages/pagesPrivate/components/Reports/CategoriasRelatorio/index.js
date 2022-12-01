import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import reportTitle from '../reportTitle';
import reportFooter from '../reportFooter';

export default function CategoriasPDF(categories) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dados = categories.map((category) => [
    { text: category.id, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: category.descricao, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: category.email, fontSize: 9, margin: [0, 2, 0, 2] },
  ]);

  const details = [
    {
      table: {
        headerRows: 1,
        widths: [40, '*', 150],
        body: [
          [
            {
              text: 'CÓDIGO', style: 'tableHeader', fontSize: 10,
            },
            { text: 'DESCRIÇÃO', style: 'tableHeader', fontSize: 10 },
            { text: 'E-MAIL', style: 'tableHeader', fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: 'headerLineOnly',
    },
    {
      text: `TOTAL DE CATEGORIAS: ${categories.length}`,
      alignment: 'right',
      fontSize: 9,
      bold: true,
      margin: [0, 24, 0, 0],
    },
  ];

  const docDefinitios = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: reportTitle('categorias de doação'),
    content: [details],
    footer: reportFooter,
  };

  pdfMake.createPdf(docDefinitios).open();
}
