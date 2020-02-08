--create citype
CREATE TYPE citype AS ENUM (
    'travis-ci',
    'drone',
    'jenkins',
    'circleci',
    'codeship',
    'wercker',
    'gitlab-ci',
    'appveyor',
    'surf'
);

CREATE TABLE project (
    gid bigint PRIMARY KEY,
    rep text NOT NULL UNIQUE -- repository ex. example/example
);

CREATE TABLE report (
    gid bigint PRIMARY KEY,
    pid bigint NOT NULL REFERENCES project (gid), -- project gid
    com char(40) NOT NULL, -- commit hash
    bra text NOT NULL, -- branch name
    rat timestamp NOT NULL, -- run at
    ci citype, -- type of ci
    job text, -- job [FUTURE USE]
    prq text, -- pull request or merge request id
    bct bigint NOT NULL, -- total block counts in this report
    bex bigint NOT NULL, -- total blocks executed int this report
    CONSTRAINT uinique_commit UNIQUE (pid, com)
);

CREATE TABLE file (
    gid bigint PRIMARY KEY,
    pid bigint REFERENCES project (gid),
    pat text NOT NULL, -- relative path (ex. main.cc, src/lib.cc)
    CONSTRAINT unique_path UNIQUE (pid, pat)
);

CREATE TABLE line_cov (
    fid bigint NOT NULL REFERENCES file (gid),
    rid bigint NOT NULL REFERENCES report (gid),
    lno smallint NOT NULL, -- line number - starts at zero
    hit smallint NOT NULL, -- how many times the line was executed
    bct smallint, -- branch count
    bex smallint, -- branches executed
    PRIMARY KEY (fid, rid, lno)
);

CREATE TABLE func_cov (
    fid bigint NOT NULL REFERENCES file (gid),
    rid bigint NOT NULL REFERENCES report (gid),
    sln smallint, -- line where function starts, starts at zero
    eln smallint, -- line where function ends, inclusive
    fna text NOT NULL, -- function name
    hit int NOT NULL, -- execution count
    bct smallint, -- number of blocks in function
    bex smallint, -- how many block were executed
    CONSTRAINT unique_fn UNIQUE (fid, rid, sln, fna)
);
