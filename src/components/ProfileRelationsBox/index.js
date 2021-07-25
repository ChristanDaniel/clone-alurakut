import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.total})</h2>

      <ul>
        {props.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.html_url} target="_blank" rel="noopener noreferrer" title="Site do usuário">
                <img src={itemAtual.avatar_url} alt="Avatar do usuário" />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <hr />
      <p>
        <a className="boxLink" href={`/amigos`} >
          Ver todos
        </a>
      </p>
    </ProfileRelationsBoxWrapper>
  )
}

export default ProfileRelationsBox
