import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `


export default function Home() {
  return (
   <MainGrid>

     <div className="profileArea" style={{ gridArea: 'profileArea' }}>
       <Box> <img src="http://github.com/ChristanDaniel.png" /> </Box>
     </div>

     <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
       <Box> Bem Vindo </Box>
     </div>
  
     <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
       <Box>Pessoas da Comunidades </Box>
     </div>

   </MainGrid>
  )
}
