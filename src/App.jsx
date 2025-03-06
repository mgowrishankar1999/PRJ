import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Admin/login";
import SubmissionForm from "./components/frontend/onlinepaper";
import Disciplinemaster from "./components/Admin/disciplinemaster";
import AddNew from "./components/Admin/addnew";
import Home from "./components/Admin/home";
import HeroSection from "./components/frontend/herosection";
import JournalMaster from "./components/Admin/JournalMaster";
import AddNewJournal from "./components/Admin/JournalAddNew";
import JournalIssue from "./components/Admin/journalissue";
import AddNewJournalissue from "./components/Admin/journalissueaddnew";
import ApcData from "./components/Admin/apcdata";
import AddnewApcdata from "./components/Admin/addnewApcdata";
import EditorialBoard from "./components/Admin/Editorialboard/editorialboard"
import AddEditorialBoard from "./components/Admin/Editorialboard/addeditorialboard";
import University from "./components/Admin/University/university";
import AddNewUniversity from "./components/Admin/University/addnew";
import Authors from "./components/Admin/Authors/authors";
import AddNewAuthor from "./components/Admin/Authors/addnewauthors";
import Articles from "./components/Admin/Articles/articles";
import AddNewArticle from "./components/Admin/Articles/addnewarticles";
import React from 'react';
import Membership from "./components/Admin/Membership/membership";
import AddNewMembership from "./components/Admin/Membership/addnewmembership";
import Subscription from "./components/Admin/Subscription/Subscription";
import AddNewSubscription from "./components/Admin/Subscription/AddNewSubscription";
import SubscriptionFiles from "./components/Admin/SubscriptionFile/SubscriptionFiles";
import AddSubscriptionFile from "./components/Admin/SubscriptionFile/AddSubscriptionFile";
import CallForPapers from "./components/Admin/CallForPapers/CallForPapers";
import AddCallForPaper from "./components/Admin/CallForPapers/AddCallForPaper";
import Testimonial from "./components/Admin/Testimonial/Testimonial";
import AddTestimonial from "./components/Admin/Testimonial/AddTestimonial";
import Indexing from "./components/Admin/Indexing/Indexing";
import AddIndexing from "./components/Admin/Indexing/AddIndexing";
import AbstractIndexing from "./components/Admin/AbstractIndexing/AbstractIndexing";
import AddAbstractIndexing from "./components/Admin/AbstractIndexing/AddAbstractIndexing";
import Joinus from "./components/Admin/Joinus";

// dynamic id route

import APCDetail from "./components/frontend/journalhome";



// pageroutes
import Benefits from "./components/frontend/pages/Benefit";
import OpenAccess from "./components/frontend/pages/openaccess";
import MissionStatement from "./components/frontend/pages/missionstatement";
import Aboutus from "./components/frontend/pages/aboutus";
import Peerreview from "./components/frontend/pages/peerreview";
import Plagiarism from "./components/frontend/pages/Plagiarism";
import Editorial from "./components/frontend/pages/editorial";
import Publication from "./components/frontend/pages/publication";
import Copyright from "./components/frontend/pages/copyright";



// menubar routes------------
import Journals from "./components/frontend/journals";
import MenuArticles from "./components/frontend/menuarticles";
import Authorsearch from "./components/frontend/authorsearch";
// import Apc from "./components/frontend/apc";
import MenuIndexing from "./components/frontend/menuindexing";
import MenuSubscription from "./components/frontend/menusubscription";
import Downloads from "./components/frontend/downloads";
import Contactus from "./components/frontend/contactus";
import Journallist from "./components/frontend/journallist";
import Frontapc from "./components/frontend/frontapc";
import Members from "./components/frontend/member";
import AuthorHub from "./components/frontend/authorhub";
import AuthorSearch from "./components/frontend/authorhub";
import Article from "./components/frontend/menuarticles";
import Awards from "./components/Admin/Awards/awards";
import AddNewAward from "./components/Admin/Awards/addawatds";
import Awardlist from "./components/frontend/awards";
import ArticleDetail from "./components/frontend/ArticleDetail";
import Newsevents from "./components/frontend/newsevents"
import Joineditorialboard from "./components/frontend/joineditorialboard";

// journalnavbarpages
import Themeeditorial from "./components/frontend/listofjournals/editorial";
import Themeeplagiarism from "./components/frontend/listofjournals/plagiarism";
import Themecopyright from "./components/frontend/listofjournals/copyright";
import Themepublication from "./components/frontend/listofjournals/publication"
import Themesubmission from "./components/frontend/listofjournals/submission";
import Themeaimandscope from "./components/frontend/listofjournals/aimandscope";
import Themeindexing from "./components/frontend/listofjournals/indexing";
import Themearchive from "./components/frontend/listofjournals/archive";
import Themecurrentissue from "./components/frontend/listofjournals/currentissue";
import Themefaq from "./components/frontend/listofjournals/faq";
import Themereviewpolicy from "./components/frontend/listofjournals/reviewpolicy";
import JournalsCategory from "./components/frontend/listofjournals/journals_category";
import EditorialBoardlist from "./components/frontend/listofjournals/editorialboard";


//private routes 
import PrivateRoute from "./components/privateroutes";
import { Navigate } from "react-router-dom";
import OnlinePapers from "./components/Admin/OnlinePapers/onlinepapers";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        {/* Protected Routes (Only Accessible if Logged In) */}
        <Route path="/dashboard" element={<PrivateRoute element={<Home />} />} />
        <Route path="/journal" element={<PrivateRoute element={<JournalMaster />} />} />
        <Route path="/addnewjournal" element={<PrivateRoute element={<AddNewJournal />} />} />
        <Route path="/addnewjournal/:id" element={<PrivateRoute element={<AddNewJournal />} />} />

        <Route path="/disciplinemaster" element={<PrivateRoute element={<Disciplinemaster />} />} />
        <Route path="/addnew" element={<PrivateRoute element={<AddNew />} />} />
        <Route path="/addnew/:id" element={<PrivateRoute element={<AddNew />} />} />


        <Route path="/journalissue" element={<PrivateRoute element={<JournalIssue />} />} />
        <Route path="/addnewjournalissue" element={<PrivateRoute element={<AddNewJournalissue />} />} />
        <Route path="/addnewjournalissue/:id" element={<PrivateRoute element={<AddNewJournalissue />} />} />


        <Route path="/editorial-board" element={<PrivateRoute element={<EditorialBoard />} />} />
        <Route path="/addneweditorialboard" element={<PrivateRoute element={<AddEditorialBoard />} />} />
        <Route path="/addneweditorialboard/:id" element={<PrivateRoute element={<AddEditorialBoard />} />} />

        <Route path="/apcdata" element={<PrivateRoute element={<ApcData />} />} />
        <Route path="/addnewapcdata" element={<PrivateRoute element={<AddnewApcdata />} />} />
        <Route path="/addnewapcdata/:id" element={<PrivateRoute element={<AddnewApcdata />} />} />


        <Route path="/university" element={<PrivateRoute element={<University />} />} />
        <Route path="/addnewuniversity" element={<PrivateRoute element={<AddNewUniversity />} />} />
        <Route path="/addnewuniversity/:id" element={<PrivateRoute element={<AddNewUniversity />} />} />

        <Route path="/authors" element={<PrivateRoute element={<Authors />} />} />
        <Route path="/addnewauthor" element={<PrivateRoute element={<AddNewAuthor />} />} />
        <Route path="/addnewauthor/:id" element={<PrivateRoute element={<AddNewAuthor />} />} />

        <Route path="/article" element={<PrivateRoute element={<Articles />} />} />
        <Route path="/addnewarticles" element={<PrivateRoute element={<AddNewArticle />} />} />
        <Route path="/addnewarticles/:id" element={<PrivateRoute element={<AddNewArticle />} />} />

        <Route path="/memberships" element={<PrivateRoute element={<Membership />} />} />
        <Route path="/addnewmembership" element={<PrivateRoute element={<AddNewMembership />} />} />
        <Route path="/addnewmembership/:id" element={<PrivateRoute element={<AddNewMembership />} />} />

        <Route path="/subscription" element={<PrivateRoute element={<Subscription />} />} />
        <Route path="/addnewsubscription" element={<PrivateRoute element={<AddNewSubscription />} />} />
        <Route path="/addnewsubscription/:id" element={<PrivateRoute element={<AddNewSubscription />} />} />

        <Route path="/subscriptionfile" element={<PrivateRoute element={<SubscriptionFiles />} />} />
        <Route path="/addnewsubscriptionfile" element={<PrivateRoute element={<AddSubscriptionFile />} />} />
        <Route path="/addnewsubscriptionfile/:id" element={<PrivateRoute element={<AddSubscriptionFile />} />} />

        <Route path="/callforpapers" element={<PrivateRoute element={<CallForPapers />} />} />
        <Route path="/addcallforpapers" element={<PrivateRoute element={<AddCallForPaper />} />} />
        <Route path="/addcallforpapers/:id" element={<PrivateRoute element={<AddCallForPaper />} />} />

        <Route path="/testimonial" element={<PrivateRoute element={<Testimonial />} />} />
        <Route path="/addTestimonial" element={<PrivateRoute element={<AddTestimonial />} />} />
        <Route path="/addTestimonial/:id" element={<PrivateRoute element={<AddTestimonial />} />} />

        <Route path="/indexing" element={<PrivateRoute element={<Indexing />} />} />
        <Route path="/addindexing" element={<PrivateRoute element={<AddIndexing />} />} />
        <Route path="/addindexing/:id" element={<PrivateRoute element={<AddIndexing />} />} />

        <Route path="/abstractindexing" element={<PrivateRoute element={<AbstractIndexing />} />} />
        <Route path="/addabstractindexing" element={<PrivateRoute element={<AddAbstractIndexing />} />} />
        <Route path="/addabstractindexing/:id" element={<PrivateRoute element={<AddAbstractIndexing />} />} />

        <Route path="/awardslist" element={<PrivateRoute element={<Awards />} />} />
        <Route path="/addawards" element={<PrivateRoute element={<AddNewAward />} />} />
        <Route path="/addawards/:id" element={<PrivateRoute element={<AddNewAward />} />} />

        <Route path="/joinus" element={<PrivateRoute element={<Joinus />} />} />



        {/* Online Papers files routes */}
        <Route path="/onlinepaperslist" element={<OnlinePapers />} />




        {/* Redirect any unknown route to /login */}
        <Route path="*" element={<Navigate to="/login" />} />
        {/* Public Routes */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/submission" element={<SubmissionForm />} />
        <Route path="/missionstatement" element={<MissionStatement />} />
        <Route path="/openaccess" element={<OpenAccess />} />
        <Route path="/benefit" element={<Benefits />} />
        <Route path="/peerreview" element={<Peerreview />} />
        <Route path="/plagiarism" element={<Plagiarism />} />
        <Route path="/editorial" element={<Editorial />} />
        <Route path="/publicationethics" element={<Publication />} />
        <Route path="/copyright" element={<Copyright />} />
        <Route path="/aboutus" element={<Aboutus />} />
        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />

        {/* Add/Edit Discipline Route */}
        {/* <Route path="/disciplinemaster" element={<Disciplinemaster />} />
        <Route path="/addnew" element={<AddNew />} />
        <Route path="/addnew/:id" element={<AddNew />} /> */}

        {/* 📚 Journal Management */}
        {/* <Route path="/journal" element={<JournalMaster />} />
        <Route path="/addnewjournal" element={<AddNewJournal />} />
        <Route path="/addnewjournal/:id" element={<AddNewJournal />} /> */}

        {/*journal issue routes  */}
        {/* <Route path="/journalissue" element={<JournalIssue />} />
        <Route path="/addnewjournalissue" element={<AddNewJournalissue />} />
        <Route path="/addnewjournalissue/:id" element={<AddNewJournalissue />} /> */}

        {/*Editorial Board routes  */}
        {/* <Route path="/editorial-board" element={<EditorialBoard />} />
        <Route path="/addneweditorialboard" element={<AddEditorialBoard />} />
        <Route path="/addneweditorialboard/:id" element={<AddEditorialBoard />} /> */}

        {/* APC Data routes */}
        {/* <Route path="/apcdata" element={<ApcData />} />
        <Route path="/addnewapcdata" element={<AddnewApcdata />} />
        <Route path="/addnewapcdata/:id" element={<AddnewApcdata />} /> */}

        {/* University routes */}
        {/* <Route path="/university" element={<University />} />
        <Route path="/addnewuniversity" element={<AddNewUniversity />} />
        <Route path="/addnewuniversity/:id" element={<AddNewUniversity />} /> */}

        {/* Authors routes */}
        {/* <Route path="/authors" element={<Authors />} />
        <Route path="/addnewauthor" element={<AddNewAuthor />} />
        <Route path="/addnewauthor/:id" element={<AddNewAuthor />} /> */}

        {/* Articles routes */}
        {/* <Route path="/article" element={<Articles />} />
        <Route path="/addnewarticles" element={<AddNewArticle />} />
        <Route path="/addnewarticles/:id" element={<AddNewArticle />} /> */}

        {/* Membership routes */}
        {/* <Route path="/memberships" element={<Membership />} />
        <Route path="/addnewmembership" element={<AddNewMembership />} />
        <Route path="/addnewmembership/:id" element={<AddNewMembership />} /> */}

        {/* Subscription routes */}
        {/* <Route path="/subscription" element={<Subscription />} />
        <Route path="/addnewsubscription" element={<AddNewSubscription />} />
        <Route path="/addnewsubscription/:id" element={<AddNewSubscription />} /> */}

        {/* Subscription files routes */}
        {/* <Route path="/subscriptionfile" element={<SubscriptionFiles />} />
        <Route path="/addnewsubscriptionfile" element={<AddSubscriptionFile />} />
        <Route path="/addnewsubscriptionfile/:id" element={<AddSubscriptionFile />} /> */}

        {/* callforpapers files routes */}
        {/* <Route path="/callforpapers" element={<CallForPapers />} />
        <Route path="/addcallforpapers" element={<AddCallForPaper />} />
        <Route path="/addcallforpapers/:id" element={<AddCallForPaper />} /> */}

        {/* Testimonial files routes */}
        {/* <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/addTestimonial" element={<AddTestimonial />} />
        <Route path="/addTestimonial/:id" element={<AddTestimonial />} /> */}

        {/* Indexing files routes */}
        {/* <Route path="/indexing" element={<Indexing />} />
        <Route path="/addindexing" element={<AddIndexing />} />
        <Route path="/addindexing/:id" element={<AddIndexing />} /> */}

        {/* Abstract Indexing files routes */}
        {/* <Route path="/abstractindexing" element={<AbstractIndexing />} />
        <Route path="/addabstractindexing" element={<AddAbstractIndexing />} />
        <Route path="/addabstractindexing/:id" element={<AddAbstractIndexing />} /> */}

        {/* Awards  files routes */}
        {/* <Route path="/awardslist" element={<Awards />} />
        <Route path="/addawards" element={<AddNewAward />} />
        <Route path="/addawards/:id" element={<AddNewAward />} /> */}




        {/* -------------MENU BAR ROUTES--------------- */}
        <Route path="/authorhub" element={<AuthorSearch />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/articles" element={<Article />} />
        <Route path="/authorsearch" element={<Authorsearch />} />
        {/* <Route path="/apc" element={<Apc />} /> */}
        <Route path="/indexings" element={<MenuIndexing />} />
        <Route path="/subscriptions" element={<MenuSubscription />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/journallist" element={<Journallist />} />
        <Route path="/Apcs" element={<Frontapc />} />
        <Route path="/Members" element={<Members />} />
        <Route path="/Awards" element={<Awardlist />} />
        <Route path="/newsevents" element={<Newsevents />} />
        <Route path="/join_us" element={<Joineditorialboard />} />


        {/* id route */}
        <Route path="/journals/:journalId/:id?" element={<APCDetail />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="journals_category/:id" element={<JournalsCategory />} />
        {/* pages for journalnavbar */}
        <Route path="/editorialboardlist/:id" element={<EditorialBoardlist />} />
        <Route path="/editorial/:id" element={<Themeeditorial />} />
        <Route path="/plagiarism/:id" element={<Themeeplagiarism />} />
        <Route path="/copyright/:id" element={<Themecopyright />} />
        <Route path="/publicationethics/:id" element={<Themepublication />} />
        <Route path="/submission/:id" element={<Themesubmission />} />
        <Route path="/aimandscope/:id" element={<Themeaimandscope />} />
        <Route path="/indexing/:id" element={<Themeindexing />} />
        <Route path="/archive/:id" element={<Themearchive />} />
        <Route path="/currentissue/:id" element={<Themecurrentissue />} />
        <Route path="/faq/:id" element={<Themefaq />} />
        <Route path="/reviewpolicy/:id" element={<Themereviewpolicy />} />
      </>
    )
  );
  return (

    <div className="app-container">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;