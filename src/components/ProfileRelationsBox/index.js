import { ProfileRelationsBoxWrapper } from '../profileRelations';


function ProfileRelationsBox(props) {
    return (
     <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">{props.title} ({props.items.length})</h2>
  
        <ul>
          {props.itens.slice(0,6).map((itemAtual) => {
            return(
             <li key={itemAtual.id}>
                <a href={itemAtual.html_url} >
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    )
}

export default ProfileRelationsBox;
