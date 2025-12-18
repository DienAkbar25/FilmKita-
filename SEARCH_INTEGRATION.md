# Search Integration Documentation

## Complete Flow Overview

### 1. HomePage Search Form
**File**: `frontend/src/pages/HomePage.jsx`

```javascript
const handleSearch = (e) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  }
};
```

- User types in search bar
- Form submits with `handleSearch` handler
- Navigates to `/search?q=breaking` (example: searching for "breaking")

### 2. Frontend Routes
**File**: `frontend/src/App.jsx`

```javascript
<Route path="/search" element={<SearchPage />} />
```

- Route receives the query parameter `q`
- SearchPage component renders

### 3. SearchPage Component
**File**: `frontend/src/pages/SearchPage.jsx`

```javascript
const queryParam = searchParams.get('q') || '';

useEffect(() => {
  if (queryParam) {
    fetchSearchResults(queryParam, genreParam);
  }
}, [queryParam, genreParam]);

const fetchSearchResults = async (query, genre) => {
  const endpoint = `/films/search?term=${encodeURIComponent(query)}`;
  const res = await api.get(endpoint);
  // ... handle response
};
```

- Extracts query parameter from URL (`?q=breaking`)
- Calls API with `/films/search?term=breaking`
- Displays results in grid

### 4. Backend Routes
**File**: `backend/src/routes/film/film.search.routes.js`

```javascript
router.get("/search", searchController.searchFilmsByTerm);
```

- Route: `/api/films/search?term=breaking`
- Maps to controller method

### 5. Backend Controller
**File**: `backend/src/controllers/film/film.search.controller.js`

```javascript
exports.searchFilmsByTerm = async (req, res) => {
  const { term } = req.query;
  // Validates term parameter
  // Executes stored procedure: dbo.SearchTitlesByTerm
  // Returns results
};
```

## Complete Search Flow Diagram

```
User Types in Search Bar
        ↓
Form Submission (handleSearch)
        ↓
Navigate to /search?q=breaking
        ↓
SearchPage Component Mounts
        ↓
Extract queryParam from URL
        ↓
useEffect triggers fetchSearchResults()
        ↓
API Call: /films/search?term=breaking
        ↓
Backend Controller
        ↓
Stored Procedure: SearchTitlesByTerm
        ↓
Database Query
        ↓
Return Results (success: true, data: [...])
        ↓
Display Results in Grid (MovieCard components)
```

## URL Examples

### Valid Search URLs
```
/search?q=breaking
/search?q=action
/search?q=avatar
/search?q=the%20dark%20knight
```

### Expected Response Format
```json
{
  "success": true,
  "page": 1,
  "data": [
    {
      "MovieID": "123",
      "Title": "Breaking Bad",
      "Rating": 9.5,
      ...
    }
  ]
}
```

## Features Implemented

✅ Search bar in HomePage
✅ Form submission handling
✅ URL parameter passing (`?q=`)
✅ SearchPage component
✅ API integration with backend
✅ Results grid display
✅ Loading state
✅ Error handling
✅ Empty state messaging
✅ Back button to HomePage

## Error Handling

### Frontend (SearchPage.jsx)
- Loading state while fetching
- Error message display if API fails
- Empty state message if no results found
- Form validation (empty search rejected)

### Backend (film.search.controller.js)
- Validates `term` parameter is not empty
- Returns 400 status if term is missing
- Catches database errors and returns 500 status
- Returns meaningful error messages

## Testing the Integration

1. **On HomePage**:
   - Type "breaking" in search bar
   - Click Search or press Enter
   - Should navigate to `/search?q=breaking`

2. **On SearchPage**:
   - Should show "Searching for "breaking""
   - Loading state appears briefly
   - Results display in grid
   - If no results, shows "No films found" message

3. **Backend Testing** (curl):
   ```bash
   curl "http://localhost:3000/api/films/search?term=breaking"
   ```
   - Should return JSON with success: true and data array

## Notes
- Search is case-insensitive (handled by stored procedure)
- Partial matching supported (searches titles containing the term)
- Results include both Movies and TV Shows
- Genre filter not applied on search (can be added later)
- Year filter not applied on search (can be added later)
