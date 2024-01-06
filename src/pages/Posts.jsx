import React, { useEffect, useState } from 'react'
import PostService from '../API/PostService'
import PostFilter from '../components/PostFilter'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import MyButton from '../components/UI/button/MyButton'
import Loader from '../components/UI/loader/Loader'
import MyModal from '../components/UI/modal/MyModal'
import Pagination from '../components/UI/pagination/Pagination'
import { useFetching } from '../components/hooks/useFetching'
import { usePosts } from '../components/hooks/usePost'
import { getPageCount } from '../utils/pages'


const Posts = () => {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })//алгоритм сортировки, поисковая строка
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page)
		setPosts(response.data)
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit))
		console.log(response.data)
	})

	console.log(totalPages);


	useEffect(() => {
		fetchPosts(limit, page)
	}, [])


	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}


	const removePost = (post) => { //получаем post из дочернего компонента
		setPosts(posts.filter(p => p.id !== post.id))//нужно удалить тот пост, который передан в аргументе, если айди эл-та = id post то удалякс
	}

	const changePage = (page) => {
		setPage(page)
		fetchPosts(limit, page)
	}


	return (
		<div className='App'>
			<MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
				Создать пользователя
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }}
			/>
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			{postError && <h1>Произошла ошибка ${postError}</h1>}

			<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
			{isPostsLoading &&
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
			}
			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages} />
		</div>
	)
}

export default Posts;