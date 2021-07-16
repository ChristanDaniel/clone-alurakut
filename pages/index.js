import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `
function ProfileSidebar(props) {
  return(
    <Box>
      <img src={`http://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {
  const UsuarioAleatorio = 'ChristanDaniel'
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

        </div>
      
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

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