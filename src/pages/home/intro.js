import { ReactComponent as Search } from '../../assets/svgs/search.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Intro = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm({ defaultValues: { 'search-bar-frosh': '' } });

  const onSubmit = (values) => {
    toast.info(values['search-bar-frosh']);
    reset();
    navigate(`/filterpage?address=${values['search-bar-frosh']}`);
  };

  const searchBar = (
    <div className="search-bar">
      <input type="text" placeholder="Qidirish" {...register('search-bar-frosh', { required: true })} />
      <button type="submit">
        <Search />
      </button>
    </div>
  );

  return (
    <div className="intro">
      <div className="content">
        <h2 className="title"> {'Keling sizning orzuyingizdagi\nuyni topaylik!'} </h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {searchBar}
        </form>
      </div>
    </div>
  );
};

export default Intro;
