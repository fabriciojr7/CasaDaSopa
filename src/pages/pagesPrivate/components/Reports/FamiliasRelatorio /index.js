import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import reportTitle from '../reportTitle';
import reportFooter from '../reportFooter';

export default function FamiliasPDF(families) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dados = families.map((family) => [
    { text: family.id, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: `${family.nome} ${family.sobrenome}`, fontSize: 9, margin: [0, 2, 0, 2] },
    { text: family.telefone, fontSize: 9, margin: [0, 2, 0, 2] },
  ]);

  const details = [
    {
      table: {
        headerRows: 1,
        widths: [20, '*', 100],
        body: [
          [
            { text: 'ID', style: 'tableHeader', fontSize: 10 },
            { text: 'Responsável', style: 'tableHeader', fontSize: 10 },
            { text: 'Telefone', style: 'tableHeader', fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: 'headerLineOnly',
    },
    {
      text: `Qtd famílias: ${families.length}`,
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
