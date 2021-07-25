import { useState, useEffect } from 'react';
import nookies from 'nookies'
import jwt from 'jsonwebtoken';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import HeadPage from '../public/index'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import ProfileRelationsBox from '../src/components/ProfileRelationsBox';


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

// function ProfileRelationsBox(props) {
//   return (
//     <ProfileRelationsBoxWrapper>
//       <h2 className="smallTitle">{props.title} ({props.total}) </h2>

//       <ul>
//         {props.items.slice(0,6).map((itemAtual) => {
//           return (
//             <li key={itemAtual.id}>
//               <a href={itemAtual.html_url} target="_blank" rel="noopener noreferrer" title="Site do usuário">
//                 <img src={itemAtual.avatar_url} alt="Avatar do usuário" />
//                 <span>{itemAtual.login}</span>
//               </a>
//             </li>
//           );
//         })}
//       </ul>
//       <hr />
//       <p>
//         <a className="boxLink" href={`/amigos`} >
//           Ver todos
//         </a>
//       </p>
//     </ProfileRelationsBoxWrapper>
//   )
// }


export default function Home(props) {
  const githubUser = props.githubUser;   //Foto de Perfil
  const [comunidades, setComunidades ] = useState([]);
  const [Numbersfollowers, setNumbersfollowers] = useState([]);
  const [seguindo, setSeguindo] = useState([]);
  const [seguidores, setSeguidores] = useState([]);

  useEffect(function() {
    //Followers
    const urlFollowers = `https://api.github.com/users/${githubUser}/followers`
    fetch(urlFollowers)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta) {
      setSeguidores(respostaCompleta);
    })

    //Following
    const urlFollowing = `https://api.github.com/users/${githubUser}/following`
    fetch(urlFollowing)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta) {
      setSeguindo(respostaCompleta);
    })
    
    //Followers lenght
    const urlNumeros = `https://api.github.com/users/${githubUser}`;
    fetch(urlNumeros)
    .then(resposta => resposta.json())
    .then(respostaJson => setNumbersfollowers(respostaJson));

    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '4e950070f5d7071115462904ea3943',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega retorno do response.json() já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })
  }, [])


  return (
    <>
      <HeadPage />
     <AlurakutMenu githubUser={githubUser}/>

      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>

          <Box>
            <h1 className="title">
            Bem Vindo(a), {githubUser}
            </h1>

           <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCriarComunidade(event) {
              event.preventDefault();
              const dadosDoForm = new FormData(event.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })

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
          <h2 className="smallTitle">comunidade ({comunidades.length})</h2>

          <ul>
            {comunidades.slice(0,6).map((itemAtual) => {
              return(
                <li key={itemAtual.id}>
                  <a href={`/communities/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
          <hr />
          <p>
            <a className="boxLink" href={`/comunidades`} >
              Ver todos
            </a>
          </p>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBox title="Seguidores" items={seguidores} total={Numbersfollowers.followers} />
        <ProfileRelationsBox title="Seguindo" items={seguindo} total={Numbersfollowers.following} />

        </div>

      </MainGrid>
   </>
  )
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { githubUser } = jwt.decode(token);

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {
      githubUser
    }
  }
}
