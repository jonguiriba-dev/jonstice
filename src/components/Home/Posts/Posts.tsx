import Post from "../Post/Post"
import './Posts.css'

type Props = {
    data: Post[]
}

const Posts: React.FC<Props> = (props:Props) => {
    return (
          <div className='posts-container'>
              {
                  props.data.map((e:Post,i)=>{
                    return (
                        <Post key={i} title={e.title} text={e.text}/>
                    )
                  })
              }
          </div>
    )
}

export default Posts