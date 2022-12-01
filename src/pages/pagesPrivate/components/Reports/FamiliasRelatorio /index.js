import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import reportTitle from '../reportTitle';
import reportFooter from '../reportFooter';

export default function FamiliasPDF(families) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dados = families.map((family) => [
    { text: family.id, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: family.nome_completo, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: family.telefone, fontSize: 9, margin: [0, 2, 0, 2] },
  ]);

  const details = [
    {
      table: {
        headerRows: 1,
        widths: [40, '*', 100],
        body: [
          [
            { text: 'CÓDIGO', style: 'tableHeader', fontSize: 10 },
            { text: 'RESPONSÁVEL', style: 'tableHeader', fontSize: 10 },
            { text: 'TELEFONE', style: 'tableHeader', fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: 'headerLineOnly',
    },
    {
      text: `TOTAL DE FAMÍLIAS: ${families.length}`,
      alignment: 'right',
      fontSize: 9,
      bold: true,
      margin: [0, 24, 0, 0],
    },
  ];

  const docDefinitios = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: reportTitle('familias'),
    content: [details],
    footer: reportFooter,
  };

  pdfMake.createPdf(docDefinitios).open();
}
