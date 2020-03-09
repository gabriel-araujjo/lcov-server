ALTER TABLE report
DROP CONSTRAINT report_pid_fkey;

ALTER TABLE report
ADD CONSTRAINT report_pid_fkey
FOREIGN KEY (pid)
REFERENCES project (gid)
ON DELETE CASCADE;

ALTER TABLE file
DROP CONSTRAINT file_pid_fkey;

ALTER TABLE file
ADD CONSTRAINT file_pid_fkey
FOREIGN KEY (pid)
REFERENCES project (gid)
ON DELETE CASCADE;

ALTER TABLE line_cov
DROP CONSTRAINT line_cov_fid_fkey;

ALTER TABLE line_cov
ADD CONSTRAINT line_cov_fid_fkey
FOREIGN KEY (fid)
REFERENCES file (gid)
ON DELETE CASCADE;

ALTER TABLE line_cov
DROP CONSTRAINT line_cov_rid_fkey;

ALTER TABLE line_cov
ADD CONSTRAINT line_cov_rid_fkey
FOREIGN KEY (rid)
REFERENCES report (gid)
ON DELETE CASCADE;

ALTER TABLE func_cov
DROP CONSTRAINT func_cov_fid_fkey;

ALTER TABLE func_cov
ADD CONSTRAINT func_cov_fid_fkey
FOREIGN KEY (fid)
REFERENCES file (gid)
ON DELETE CASCADE;

ALTER TABLE func_cov
DROP CONSTRAINT func_cov_rid_fkey;

ALTER TABLE func_cov
ADD CONSTRAINT func_cov_rid_fkey
FOREIGN KEY (rid)
REFERENCES report (gid)
ON DELETE CASCADE;
