import { useState } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `
function ProfileSidebar(props) {
  return(
    <Box as="aside">
      <img src={`http://github.com/${props.githubUser}.png`} style={{ borderRadius: '70px'}}/>
      <hr />

      <p>
        <a className="boxLink" href={`http://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
        <hr />
      </p>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const UsuarioAleatorio = 'ChristanDaniel'
  const [comunidades, setComunidades ] = useState([{
    id: '123153218651861542521352',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'diego3g', 'felipefialho']
  
  return (
    <>
     <AlurakutMenu githubUser={UsuarioAleatorio}/>

      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={UsuarioAleatorio}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>

          <Box>
            <h1 className="title">
            Bem Vindo(a)
            </h1>

           <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCriarComunidade(event) {
              event.preventDefault();
              const dadosDoForm = new FormData(event.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>
              <div>
                <input 
                placeholder="Coloque uma URL para usarmos de capa?"
                name="image"
                aria-label="Coloque uma URL para usarmos de capa?"
                type="text"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>

        </div>
      
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">comunidade ({pessoasFavoritas.length})</h2>

          <ul>
            {comunidades.map((itemAtual) => {
              return(
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidades ({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return(
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`} style={{ borderRadius: '25px'}}>
                    <img src={`http://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        </div>

      </MainGrid>
   </>
  )
}

{/* <Box> Comunidades </Box> */}