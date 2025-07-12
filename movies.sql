create table movies (
  id bigserial primary key,
  content text, -- corresponds to the "text chunk"
  embeddings vector(1536) -- 1536 works for OpenAI embeddings
);