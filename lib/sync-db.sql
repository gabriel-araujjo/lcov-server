CREATE TABLE IF NOT EXISTS project (
    gid bigint PRIMARY KEY,
    rep text NOT NULL UNIQUE -- repository ex. example/example
);

CREATE TABLE IF NOT EXISTS report (
    gid bigint PRIMARY KEY,
    pid bigint NOT NULL REFERENCES project (gid), -- project gid
    com char(40) NOT NULL, -- commit hash
    bra text NOT NULL, -- branch name
    rat timestamp NOT NULL, -- run at
    bct bigint NOT NULL, -- total block counts in this report
    bex bigint NOT NULL, -- total blocks executed int this report
    CONSTRAINT uinique_commit UNIQUE (pid, com)
);

CREATE TABLE IF NOT EXISTS file (
    gid bigint PRIMARY KEY,
    pid bigint REFERENCES project (gid),
    pat text NOT NULL, -- relative path (ex. main.cc, src/lib.cc)
    CONSTRAINT unique_path UNIQUE (pid, pat)
);

CREATE TABLE IF NOT EXISTS line_cov (
    fid bigint NOT NULL REFERENCES file (gid),
    rid bigint NOT NULL REFERENCES report (gid),
    lno smallint NOT NULL, -- line number - starts at zero
    hit smallint NOT NULL, -- how many times the line was executed
    bct smallint NOT NULL, -- branch count
    bex smallint NOT NULL, -- branches executed
    PRIMARY KEY (fid, rid, lno)
);

CREATE TABLE IF NOT EXISTS func_cov (
    fid bigint NOT NULL REFERENCES file (gid),
    rid bigint NOT NULL REFERENCES report (gid),
    lno smallint NOT NULL, -- line where function is, starts at zero
    fna text NOT NULL, -- function name
    hit int NOT NULL, -- execution count
    bct smallint NOT NULL, -- number of blocks in function
    bex smallint NOT NULL, -- how many block were executed
    CONSTRAINT unique_fn UNIQUE (fid, rid, lno, fna)
);
