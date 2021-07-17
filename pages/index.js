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
    <Box>
      <img src={`http://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px'}}/>
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
  const [comunidade, setComunidades ] = useState(['Alurakut']);
  
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'diego3g', 'felipefialho']
  
  return (
    <>
     <AlurakutMenu />

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

              const comunidadesAtualizadas = [...comunidade, 'Alura Stars'];
              setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input 
                placeholder="qual vai ser o nome da sua comunidade?"
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
        <ul>
          {comunidade.map((itemAtual) => {
            return(
              <li>
              <a href={`/users/${itemAtual}`} key={itemAtual}>
                <img src={`http://placehold.it/300x300`} />
                <span>{itemAtual}</span>
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
                    <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
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