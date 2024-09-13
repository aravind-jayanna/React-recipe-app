import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "./components/modal";
import {
  Header,
  AppNameComponent,
  AppIcon,
  SearchComponent,
  SearchIcon,
  SearchInput,
} from "./components/headerComponents";
import {
  RecipeListContainer,
  RecipeContainer,
  CoverImage,
  RecipeName,
  IngredientsText,
  SeeMoreText,
} from "./components/recipeComponents";

import {
  ClickableHeader,
  Loader,
  ErrorMessage,
  WelcomeMessage,
  NoRecipesMessage,
  LoadMoreButton,
  Footer,
} from "./components/styleHelper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ hasSearched }) =>
    hasSearched ? "none" : "url(/lp.jpeg) no-repeat center center fixed"};
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  padding-bottom: 80px; /* Adjusted for footer and Load More button */
`;

function App() {
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [hasMoreRecipes, setHasMoreRecipes] = useState(false);

  const API_ID = "b5c4d4b9";
  const API_KEY = "ce89ac4c16ce1061a9393670688bf4a8";
  const RECIPE_BASE_URL = "https://api.edamam.com/api/recipes/v2";

  const onSearch = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => {
      if (event.target.value.length) {
        setSearched(true);
        updateRecipeList([]);
        setNextPageUrl("");
        setHasMoreRecipes(false);
        fetchRecipe(event.target.value);
      } else {
        setSearched(false);
        updateRecipeList([]);
        setNextPageUrl("");
        setHasMoreRecipes(false);
      }
    }, 1000);
    updateTimeoutId(timeout);
  };

  const fetchRecipe = (data, nextPageUrl = "") => {
    setLoading(true);
    setError("");
    const url =
      nextPageUrl ||
      `${RECIPE_BASE_URL}?type=any&q=${data}&app_id=${API_ID}&app_key=${API_KEY}`;

    axios
      .get(url)
      .then(function (response) {
        updateRecipeList((prevList) => [...prevList, ...response.data.hits]);
        setNextPageUrl(response.data._links?.next?.href || "");
        setHasMoreRecipes(!!response.data._links?.next?.href);
        setLoading(false);
      })
      .catch(function (error) {
        setError("An error occurred while fetching recipes.");
        setLoading(false);
      });
  };

  const loadMoreRecipes = () => {
    fetchRecipe("", nextPageUrl);
  };

  const RecipeComponent = ({ recipeObj }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    return (
      <>
        <RecipeContainer>
          <CoverImage
            src={recipeObj.recipe.image}
            alt={recipeObj.recipe.label}
          />
          <RecipeName> {recipeObj.recipe.label} </RecipeName>
          <IngredientsText onClick={handleOpenModal}>
            Ingredients
          </IngredientsText>
          <SeeMoreText onClick={() => window.open(recipeObj.recipe.url)}>
            See Complete Recipe
          </SeeMoreText>
        </RecipeContainer>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          ingredients={recipeObj.recipe.ingredients.map(
            (ingredient) => ingredient.text
          )}
        />
      </>
    );
  };

  return (
    <Container hasSearched={searched}>
      <Header>
        <ClickableHeader href="/" title="Reload Page">
          <AppIcon src="/app-icon.svg" />
          <AppNameComponent>Recipe Finder</AppNameComponent>
        </ClickableHeader>
        <SearchComponent>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput placeholder="Search Recipe" onChange={onSearch} />
        </SearchComponent>
      </Header>
      <RecipeListContainer>
        {loading && <Loader />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && !searched && (
          <WelcomeMessage>
            Welcome to Recipe Finder! Start by typing a recipe name in the
            search box above.
          </WelcomeMessage>
        )}
        {!loading && !error && searched && recipeList.length === 0 && (
          <NoRecipesMessage>
            No recipes found. Try a different search.
          </NoRecipesMessage>
        )}
        {!loading &&
          !error &&
          recipeList.length > 0 &&
          recipeList.map((recipeObj, index) => (
            <RecipeComponent key={index} recipeObj={recipeObj} />
          ))}
      </RecipeListContainer>
      {!loading && hasMoreRecipes && (
        <LoadMoreButton onClick={loadMoreRecipes}>Load More</LoadMoreButton>
      )}
      <Footer>&copy; 2024 Recipe Finder. All rights reserved.</Footer>
    </Container>
  );
}

export default App;
