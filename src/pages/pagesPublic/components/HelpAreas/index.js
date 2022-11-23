import TitleSection from '../TitleSection';
import ContainerSection from '../ContainerSection';

import { Content } from './styles';

import icoAlimentacao from '../../../../assets/images/alimentacao.svg';
import icoMedicamentos from '../../../../assets/images/medicamentos.svg';
import icoAssistencia from '../../../../assets/images/assistencia.svg';

const items = [
  {
    id: 1,
    title: 'Alimentação',
    description: `Servimos refeições que são preparadas com muito amor e carinho,
    para que as famílias possam se alimentar de forma certa e como merecem.
    `,
    ico: icoAlimentacao,
  },
  {
    id: 2,
    title: 'Medicamentos',
    description: `Buscamos conseguir medicamentos para aqueles que não tem condições de
    comprar, assim podem ter o tratamento adequado.
    `,
    ico: icoMedicamentos,
  },
  {
    id: 3,
    title: 'Assistência',
    description: `Prestamos diversos tipos de assistências, sempre tentando ajudar o máximo
    aqueles que mais precisam de nós e da melhor forma possível.`,
    ico: icoAssistencia,
  },
];

export default function HelpAreas() {
  return (
    <ContainerSection>
      <TitleSection
        title="Não servimos apenas uma refeição"
        subtitle="Ajudamos aqueles que mais precisam"
      />

      <Content>
        {
            items.map((item) => (
              <div key={item.id} className="card">
                <div className="card-header">
                  <div className="img-area">
                    <img src={item.ico} alt={item.title} />
                  </div>

                  <h4>{item.title}</h4>
                </div>

                <small>{item.description}</small>
              </div>
            ))
        }
      </Content>
    </ContainerSection>
  );
}
