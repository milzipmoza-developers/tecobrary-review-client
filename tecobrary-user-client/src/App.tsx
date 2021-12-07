import React, {ReactElement} from "react";
import {Route, Switch} from "react-router-dom";
import TimelinePage from "./pages/TimelinePage";
import MyPage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";
import BookDetailPage from "./pages/bookDetail/BookDetailPage";
import HomePage from "./pages/home/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import BookListPage from "./pages/bookList/BookListPage";
import BookReviewPage from "./pages/bookReview/BookReviewPage";
import ReviewAddPage from "./pages/review/ReviewAddPage";
import AdminHomePage from "./admin/pages/AdminHomePage";
import AdminCategoryPage from "./admin/pages/category/AdminCategoryPage";
import AdminMarkPage from "./admin/pages/mark/AdminMarkPage";
import AdminBookPage from "./admin/pages/book/AdminBookPage";
import AdminNewArrivalPage from "./admin/pages/arrival/AdminNewArrivalPage";

function App(): ReactElement {
    return (
      <Switch>
          <Route exact path={'/'} component={HomePage}/>
          <Route exact path={'/timeline'} component={TimelinePage}/>
          <Route exact path={'/my-page'} component={MyPage}/>
          <Route exact path={'/review'} component={ReviewAddPage}/>
          <Route exact path={'/books/:bookId'} component={BookDetailPage}/>
          <Route exact path={'/books/:bookId/reviews'} component={BookReviewPage}/>
          <Route exact path={'/books'} component={BookListPage}/>
          <Route exact path={'/categories'} component={CategoriesPage}/>

          <Route exact path={'/admin'} component={AdminHomePage}/>
          <Route exact path={'/admin/categories'} component={AdminCategoryPage}/>
          <Route exact path={'/admin/marks'} component={AdminMarkPage}/>
          <Route exact path={'/admin/books'} component={AdminBookPage}/>
          <Route exact path={'/admin/new-arrivals'} component={AdminNewArrivalPage}/>
          <Route component={NotFoundPage}/>
      </Switch>
  );
}

export default App;
