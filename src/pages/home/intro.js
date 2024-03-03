import { ReactComponent as Search } from 'assets/svgs/search.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Intro = () => {
  const { handleSubmit, register, reset } = useForm({ defaultValues: { 'search-bar-frosh': '' } });

  const onSubmit = (values) => {
    toast.info(values['search-bar-frosh']);
    reset();
  };

  const navigate = useNavigate()

  const searchBar = (
    <div className="search-bar">
      <input type="text" placeholder="Qidirish" {...register('search-bar-frosh', { required: true })} />
      <button type="submit" onClick={() => navigate('/Filterpage')}>
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
