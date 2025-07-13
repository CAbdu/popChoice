create or replace function match_movies (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    movies.id,
    movies.content,
    1 - (movies.embeddings <=> query_embedding) as similarity
  from movies
  where 1 - (movies.embeddings <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;